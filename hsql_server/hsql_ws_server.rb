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
  def initialize(collection, fo_name, attr_seq, period, file)
    @collection = collection
    @fo_name = fo_name
    @attr_seq = attr_seq
    @period = period
    @file = file
    @name = (collection.to_s+'/'+fo_name.to_s+'/'+attr_seq.to_s).to_sym
  end
  attr_reader :collection, :fo_name, :attr_seq, :period, :file, :name
end


class QLInfo
  def initialize()
    @documents = {}
  end

  def insert(client_id, collection, fo_name, attr_seq, period, file)
    ql = QLDocument.new(collection, fo_name, attr_seq, period, file)
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
            p ql_data.to_json
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
        ql_collection = ql["collection"].to_sym
        ql_fo_name = ql["fo_name"].to_sym
        ql_attr_seq = ql["attr_seq"].to_sym
        ql_period = ql["period"].to_i
        ql_file = ql["file"] or true
        @ql_info.insert(cid, ql_collection, ql_fo_name, ql_attr_seq,
                        ql_period, ql_file)
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
        if ql.period > 0 && time_index % ql.period == 0
          unless documents[ql.name]
            query = {
              :FunctionalObjectName => ql.fo_name.to_s,
              :AttributeSequenceName => ql.attr_seq.to_s
            }
            # p query
            option = {:sort => ["$natural", :descending]}
            obj = DB[ql.collection.to_s].find_one(query, option)
            # p obj
            
            if ql.file
              a = {}
              obj.each {|k, v|
                if v.class==BSON::OrderedHash && fileName = v["FileName"]
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
                  a[k] = sprintf("<img src=\"%s\" alt=\"%s\"%s>",
                                 "tmp/"+fileName, k, imageSize)
                end
              }
              documents[ql.name] = a.to_json
            else
              documents[ql.name] = obj.to_json
            end
          end
        end
      }

      data = {}
      @ql_info.each_client_info{|client|
        cid = client[0]
        data[cid] = {}
        client[1].each{|ql|
          name = ql.name
          period = ql.period
          if period > 0 && time_index%period == 0
            data[cid][name] = documents[name]
          end
        }
      }

      # p data
      @channel.push(data)

      sleep 1 # 1 second
      time_index += 1
    end
  end

end
