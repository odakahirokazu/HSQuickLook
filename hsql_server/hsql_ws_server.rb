#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

########################################
#   hsql WebSocket server
#   Hirokazu Odaka
#   2012-10-08
#   2013-02-13
#   2013-08-02 | DL
#   2013-09-06 | modify image tag
#   2013-10-08 | use data URI scheme for images
########################################

require 'rubygems'
require 'em-websocket'
require 'mongo'
require 'json'
require 'mime/types'

########################################
### QL definition
########################################
DBName = ( ARGV[0] or "qldb" )
Host = ( ARGV[1] or "localhost" )
Port = ( ARGV[2] ? ARGV[2].to_i : 27017 )
########################################


def log(message, io=STDOUT)
  io.puts Time.now.to_s + " | " + message
  io.flush
end


class QLDocument
  def initialize(collection, directory, document, period)
    @collection = collection
    @directory = directory
    @document = document
    @period = period
    @name = (collection.to_s+'/'+directory.to_s+'/'+document.to_s).to_sym
  end

  attr_reader :collection, :directory, :document, :period
  attr_reader :name

  def read(db, time=nil)
    query = {
      :Directory => @directory.to_s,
      :Document => @document.to_s
    }

    if time
      query[:UNIXTIME] = {"$gte" => time}
      option = {:sort => ["$natural", :ascending]}
    else
      option = {:sort => ["$natural", :descending]}
    end

    obj = db[@collection.to_s].find_one(query, option)

    # p query
    # p obj

    if obj.class != BSON::OrderedHash
      obj = {}
    end

    return obj
  end

  def active_phase?(time_index)
    @period>0 && time_index%@period==0
  end
end


class ClientRequest
  def initialize(id)
    @client_id = id
    @documents = []
    @time = nil
  end

  attr_reader :client_id
  attr_accessor :time

  def insert(collection, directory, document, period)
    doc = QLDocument.new(collection, directory, document, period)
    @documents << doc
  end

  def each(); @documents.each{|doc| yield doc }; end
  include Enumerable
end


class DocumentStore
  def initialize()
    @documents = {}
  end

  def clear()
    @documents.each_value{|array| array.clear }
  end

  def checkout(name, time)
    if d = @documents[name]
      d.each do |time_data_pair|
        return time_data_pair[1] if time_data_pair[0]==time
      end
    end
    return nil
  end

  def push(name, time, data)
    @documents[name] ||= []
    @documents[name] << [time, data]
  end
end


class ClientManager
  def initialize()
    @clients = {}
    @data = nil
    @clients_to_register = {}
    @clients_to_delete = []
  end
  attr_reader :data

  def propose_register(id)
    @clients_to_register[id] = ClientRequest.new(id)
  end

  def propose_delete(id)
    @clients_to_delete << id
  end

  def register_clients()
    @clients.merge!(@clients_to_register)
  end

  def delete_clients()
    while id = @clients_to_delete.shift
      @clients.delete(id)
    end
  end

  def get(id)
    @clients_to_register[id] || @clients[id]
  end

  def initialize_data()
    @data = {}
    @clients.each_key{|cid| @data[cid] = {} }
    @document_store = DocumentStore.new
  end

  def request_data(db, time_index)
    @document_store.clear

    @clients.each_value do |request|
      cid = request.client_id
      time = request.time
      request.each do |doc|
        if doc.active_phase?(time_index)
          obj = @document_store.checkout(doc.name, time)
          if obj==nil
            obj = doc.read(db, time)
            @document_store.push(doc.name, time, obj)
          end
          json = convert_object(obj)
          @data[cid][doc.name] = obj
        end
      end
    end
  end
end


def convert_object(obj)
  blocks = obj["Blocks"]
  if blocks
    blocks.each do |block|
      contents = ( block["Contents"] or {} )
      convert_contents(contents)
    end
  end

  return obj.to_json
end


def convert_contents(obj, image_format="json")
  obj.each do |k, v|
    next unless v.class == BSON::OrderedHash
    if v["DataType"] == "image"
      file_name = v["FileName"]
      data = v['Data'].to_s
      # p data
      height = v['Height']
      width = v['Width']
      mime_type = MIME::Types.type_for(file_name)[0].to_s
      data_base64 = Base64::encode64(data)

      if image_format=="json"
        image = { data: data_base64, type: mime_type}
        if height && width
          image[:height] = height.to_s
          image[:width] = width.to_s
        end
        obj[k] = image.to_json
      elsif image_format=="img-tag"
        data_uri = "data:#{mime_type};base64,#{data_base64}"
        image_size = ""
        if height && width
          image_size = sprintf("height=\"%d\" width=\"%d\"", height, width)
        end
        tag = sprintf("<img class=\"image_new\" src=\"%s\" alt=\"%s\" %s>",
                      data_uri, k, image_size)
        obj[k] = tag
      elsif image_format=="data"
        obj[k] = data_base64
      else
        log "Error: image format is invalid. "+image_format
        obj[k] = ""
      end
    end
  end
end


class HSQuickLookServer
  def initialize()
    @client_manager = ClientManager.new
  end

  def mongodb(host, port, db_name)
    connection = Mongo::Connection.new(host, port)
    @db = connection.db(db_name)
  end

  def interpret_message(mes, client_id)
    o = JSON.parse(mes)
    if collection = o["collection"]
      collection = collection.to_sym
      directory = o["directory"].to_sym
      document = o["document"].to_sym
      period = o["period"].to_i
      @client_manager.get(client_id).insert(collection, directory, document, period)
    elsif time_request = o["time"]
      time = nil
      if time_request[0..1] == "DL"
        time = Time.utc(*time_request[3..-1].strip.split(':'))
      elsif time_request[0..1] == "QL"
        time = nil
      end
      @client_manager.get(client_id).time = time
    else
      log "Received an unknown-type message."
    end
  end

  def run()
    EventMachine::run do
      log 'Run WebSocket Server.'
      STDOUT.flush
      @channel = EM::Channel.new
      @current_client_id = 0

      EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
        ws.onopen do
          @current_client_id = @current_client_id + 1
          cid = @current_client_id
          log "Connected to Client #{cid}"
          @client_manager.propose_register(cid)

          sid = @channel.subscribe do |data|
            if data.class == Hash
              if obj = data[cid]
                ws.send(obj.to_json) unless obj.empty?
              end
            else
              ws.send(data.to_s)
            end
          end

          ws.onmessage do |mes|
            begin
              log "Received from Client #{cid}: #{mes}"
              interpret_message(mes, cid)
            rescue => ex
              p ex
            ensure
              STDOUT.flush
            end
          end

          ws.onclose do
            log "Disconnected Client #{cid}"
            @channel.unsubscribe(sid)
            @client_manager.propose_delete(cid)
            STDOUT.flush
          end

          STDOUT.flush
        end
      end

      EventMachine::defer do
        time_index = 0
        loop do
          @client_manager.register_clients()
          @client_manager.delete_clients()
          @client_manager.initialize_data()
          @client_manager.request_data(@db, time_index)
          data = @client_manager.data
          # p data
          @channel.push(data)
          sleep 1 # wait for 1 second
          time_index += 1
        end
      end
    end
  end
end


### Main ###
puts '************************************************************'
puts '*                                                          *'
puts '*             HSQuickLook WebSocket Server                 *'
puts '*                                                          *'
puts '************************************************************'
puts ''
puts 'MongoDB connection to '+Host+':'+Port.to_s
puts 'Database: '+DBName
puts ''
STDOUT.flush

server = HSQuickLookServer.new
server.mongodb(Host, Port, DBName)
server.run
