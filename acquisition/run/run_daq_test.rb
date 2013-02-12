#!/usr/bin/env ruby

require 'dAQTest'
require 'ANLLib'

include DAQTest

dbName = ( ARGV[0] or "hxiql" )
dbHost = ( ARGV[1] or "localhost" )

app = ANLApp.new
app.chain :MongoDBClient
app.chain :WaitFor
app.chain :DAQ2
app.chain :DAQ3

app.set_parameters :MongoDBClient, {
  "MongoDB host" => dbHost,
  "Database name" => dbName,
}

app.set_parameters :WaitFor, {
  "Time us" => 100000,
}

app.set_parameters :DAQ2, {
  "Instrument" => "HXI-1",
}

app.set_parameters :DAQ3, {
  "Instrument" => "HXI-1",
  "Image file" => "image.png",
  "Image height" => 600,
  "Image width" => 600,
}

app.run(-1, 10)
