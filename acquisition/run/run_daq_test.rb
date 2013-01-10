#!/usr/bin/env ruby

require 'dAQTest'
require 'ANLLib'

include DAQTest

app = ANLApp.new
app.chain :DAQ

app.set_parameters :DAQ, {
  "MongoDB host" => "cosmos1",
  "Database name" => "sgdql",
  "Instrument" => "SGD-2",
}

app.run(100000, 100)
