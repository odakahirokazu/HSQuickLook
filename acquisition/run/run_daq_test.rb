#!/usr/bin/env ruby

require 'dAQTest'
require 'anlnext'

class DAQApp < ANL::ANLApp
  def initialize(database, host)
    @database = database
    @host = host
    super()
  end

  def setup()
    chain DAQTest::MongoDBClient
    with_parameters(host: @host,
                    database: @database)

    chain DAQTest::WaitFor
    with_parameters(time: 100000)

    chain DAQTest::DAQ2
    with_parameters(instrument: "HXI-1")

    chain DAQTest::DAQ3
    with_parameters(instrument: "HXI-1",
                    filename: "image.png",
                    height: 600,
                    width: 600)
  end
end

database = ( ARGV[0] or "qldb" )
host = ( ARGV[1] or "localhost" )

a = DAQApp.new(database, host)
a.run(1000000, 1)
