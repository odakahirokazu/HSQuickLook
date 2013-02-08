#!/usr/bin/env ruby

require 'dAQTest'
require 'ANLLib'

include DAQTest

dbName = ( ARGV[0] or "hxiql" )
dbHost = ( ARGV[1] or "localhost" )

app = ANLApp.new
app.chain :DAQ2

app.set_parameters :DAQ2, {
  "MongoDB host" => dbHost,
  "Database name" => dbName,
  "Instrument" => "HXI-1",
}

app.run(100, 10)
