#!/usr/bin/env ruby
# -*- coding: utf-8 -*-

########################################
#   hsql WebSocket server
#   Hirokazu Odaka
#   2012-10-08
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
FileTmpDir = ( ARGV[2] or ENV["HOME"]+"/Sites/hsql_client/tmp" )

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

  def each_collection()
    @documents.values.flatten.each{|ql|
      yield ql
    }
  end

  def each_client_info()
    @documents.each{|c|
      yield c
    }
  end
end


def collect_document(ql, mongodb, file_dir)
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
  
  blocks = obj["Contents"]
  if blocks
    blocks.each do |block|
      contents = block["Contents"]
      convert_contents(contents)
    end
  end

  if nil
    a = {}
    obj.each {|k, v|
      if v.class==BSON::OrderedHash && fileName = v["FileName"]
        path = file_dir+"/"+fileName
        # p v['Data']
        File.open(path, "w+b") {|fout|
          fout.write(v['Data'].to_s)
        }
        height = v['Height']
        width = v['Width']
        imageSize = ""
        if height && width
          imageSize = sprintf(" height=\"%d\" width=\"%d\"",
                              height, width)
        end
        a[k] = sprintf("<img src=\"%s\" alt=\"%s\"%s>",
                       "tmp/"+fileName, k, imageSize)
      end
    }
    return a.to_json
  else
    return obj.to_json
  end
end


def convert_contents(obj)
  obj.each do |k, v|
    next unless v.class == BSON::OrderedHash
    if v["DataType"] == "image"
      fileName = v["FileName"]
      path = FileTmpDir+"/"+fileName
      # p v['Data']
      File.open(path, "w+b") {|fout|
        fout.write(v['Data'].to_s)
      }
      height = v['Height']
      width = v['Width']
      imageSize = ""
      if height && width
        imageSize = sprintf(" height=\"%d\" width=\"%d\"",
                            height, width)
      end
      obj[k] = sprintf("<img src=\"%s\" alt=\"%s\"%s>",
                       "tmp/"+fileName, k, imageSize)
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
        collection = ql["collection"].to_sym
        fo = ql["fo_name"].to_sym
        as = ql["attr_seq"].to_sym
        period = ql["period"].to_i
        @ql_info.insert(cid, collection, fo, as, period)
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
      documents = {}
      @ql_info.each_collection{|ql|
        next if documents[ql.name]
        if ql.period > 0 && (time_index % ql.period) == 0
          documents[ql.name] = collect_document(ql, DB, FileTmpDir)
        end
      }

      data = {}
      @ql_info.each_client_info{|client_info|
        cid = client_info[0]
        data[cid] = {}
        client_info[1].each{|ql|
          if ql.period > 0 && (time_index % ql.period) == 0
            data[cid][ql.name] = documents[ql.name]
          end
        }
      }

      # p data
      @channel.push(data)
      sleep 1 # wait for 1 second
      time_index += 1
    end
  end

end
