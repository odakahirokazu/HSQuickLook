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


class QLCollection
  def initialize(name, period, file)
    @name = name
    @period = period
    @file = file
  end
  attr_reader :name, :period, :file
end


class QLInfo
  def initialize()
    @collections = {}
  end

  def insert(client_id, ql_collection, ql_period, ql_file)
    ql = QLCollection.new(ql_collection, ql_period, ql_file)
    if @collections[client_id]
      @collections[client_id] << ql
    else
      @collections[client_id] = [ql]
    end
  end

  def delete(client_id)
    @collections.delete(client_id)
  end

  def each_collection()
    @collections.values.flatten.each{|ql|
      yield ql
    }
  end

  def each_client_info()
    @collections.each{|c|
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
        ql_period = ql["period"].to_i
        ql_file = ql["file"] or true
        @ql_info.insert(cid, ql_collection, ql_period, ql_file)
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
      collections = {}
      @ql_info.each_collection{|ql|
        if ql.period > 0 && time_index % ql.period == 0
          unless collections[ql.name]
            obj = DB[ql.name.to_s].find_one(nil, {:sort => ["$natural", :descending]})
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
              collections[ql.name] = a.to_json
            else
              collections[ql.name] = obj.to_json
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
            data[cid][name] = collections[name]
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
