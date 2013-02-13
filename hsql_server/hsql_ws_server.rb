#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

########################################
#   hsql WebSocket server
#   Hirokazu Odaka
#   2012-10-08
#   2013-02-13 (last modified)
########################################

require 'rubygems'
require 'em-websocket'
require 'mongo'
require 'json'

########################################
### QL definition
########################################
DBName = ( ARGV[0] or "hxiql" )
Host = ( ARGV[1] or "localhost" )
Port = ( ARGV[2] ? ARGV[2].to_i : 27017 )
WebSiteDirectory = ENV["HOME"]+"/Sites"
# WebSiteDirectory = ENV["HOME"]+"/public_html"
########################################


class QLDocument
  def initialize(collection, functional_object, attribute_sequence, period)
    @collection = collection
    @functional_object = functional_object
    @attribute_sequence = attribute_sequence
    @period = period
    @name = (collection.to_s+'/'+functional_object.to_s+'/'+attribute_sequence.to_s).to_sym
  end

  attr_reader :collection, :functional_object, :attribute_sequence, :period
  attr_reader :name
end


class QLInfo
  def initialize()
    @documents = {}
  end
  
  def insert(client_id, collection, functional_object, attribute_sequence, period)
    ql = QLDocument.new(collection, functional_object, attribute_sequence, period)
    if @documents[client_id]
      @documents[client_id] << ql
    else
      @documents[client_id] = [ql]
    end
  end

  def delete(client_id)
    @documents.delete(client_id)
  end

  def collections()
    @documents.values.flatten
  end

  def each_client_info()
    @documents.each{|c|
      yield c
    }
  end

  def clients(name, time_index=0)
    list = []
    @documents.each{|client_id, ql_list|
      ql_list.each{|ql|
        if ql.name==name && ql.period>0 && (time_index % ql.period)==0
          list << client_id
        end
      }
    }
    return list.uniq
  end
end


def collect_document(ql, mongodb)
  query = {
    :FunctionalObjectName => ql.functional_object.to_s,
    :AttributeSequenceName => ql.attribute_sequence.to_s
  }
  # p query
  
  option = {:sort => ["$natural", :descending]}
  obj = mongodb[ql.collection.to_s].find_one(query, option)
  # p obj
  
  if obj.class != BSON::OrderedHash
    return nil
  end

  return obj
end


def convert_object(obj, file_dirs)
  blocks = obj["Blocks"] if obj
  if blocks
    blocks.each do |block|
      contents = block["Contents"]
      convert_contents(contents, file_dirs)
    end
  end

  return obj.to_json
end


def convert_contents(obj, file_dirs)
  obj.each do |k, v|
    next unless v.class == BSON::OrderedHash
    if v["DataType"] == "image"
      fileName = v["FileName"]
      data = v['Data'].to_s
      # p data
      file_dirs.each do |dir|
        path = dir+"/"+fileName
        File.open(path, "w+b") {|fout|
          fout.write(data.to_s)
        }
      end
      height = v['Height']
      width = v['Width']
      imageSize = ""
      if height && width
        imageSize = sprintf(" height=\"%d\" width=\"%d\"",
                            height, width)
      end
      query = "?%d" % Time.now.to_i
      obj[k] = sprintf("<img src=\"%s\" alt=\"%s\"%s>",
                       "tmp/"+fileName+query, k, imageSize)
    end
  end
end


### Open a connection to MongoDB
puts 'HSQL WebSocket Server started.'
puts 'MongoDB connection to '+Host+':'+Port.to_s
puts 'DB name: '+DBName

Connection = Mongo::Connection.new(Host, Port)
DB = Connection.db(DBName)

EventMachine::run do
  puts 'Run WebSocket Server.'
  @channel = EM::Channel.new
  @client_id = 0
  @ql_info = QLInfo.new
  @file_directory_map = {}
  
  EventMachine::WebSocket.start(:host => "0.0.0.0", :port => 8080) do |ws|
    ws.onopen {
      @client_id = @client_id + 1
      cid = @client_id

      sid = @channel.subscribe {|mes|
        if mes.class == Hash
          ql_data = mes[cid]
          if ql_data
            # p ql_data.to_json
            ws.send(ql_data.to_json) unless ql_data.empty?
          end
        else
          ws.send(mes)
        end
      }
      puts "Client #{sid} --- connected"

      ws.onmessage {|mes|
        puts "Client #{sid}: #{mes}"
        ql = JSON.parse(mes)
        if file_dir = ql["fileDirectory"]
          file_dir_full = WebSiteDirectory+"/"+file_dir
          @file_directory_map[cid] = file_dir_full
        else
          collection = ql["collection"].to_sym
          fo = ql["functionalObject"].to_sym
          as = ql["attributeSequence"].to_sym
          period = ql["period"].to_i
          @ql_info.insert(cid, collection, fo, as, period)
        end
      }

      ws.onclose {
        puts "Client #{sid} --- disconnected"
        @channel.unsubscribe(sid)
        @channel.push("Client #{sid}: disconnected")
        @ql_info.delete(cid)
      }
    }
  end


  EventMachine::defer do
    time_index = 0
    loop do
      data = {}
      @ql_info.each_client_info{|client_info|
        cid = client_info[0]
        data[cid] = {}
      }

      names = {}
      @ql_info.collections.each{|ql|
        next if names[ql.name]
        
        clients = @ql_info.clients(ql.name, time_index)
        next if clients.size==0
        
        obj = collect_document(ql, DB) 
        names[ql.name] = true
        file_dirs = clients.map{|c| @file_directory_map[c] }.uniq
        json = convert_object(obj, file_dirs)
        clients.each {|cid|
          data[cid][ql.name] = json
        }
      }

      # p data
      @channel.push(data)
      sleep 1 # wait for 1 second
      time_index += 1
    end
  end

end
