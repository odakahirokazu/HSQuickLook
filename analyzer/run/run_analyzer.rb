#!/usr/bin/env ruby

require 'HSQuickLook'
require 'anlnext'

class AnalyzerExample < ANL::ANLApp
  def initialize(database, host)
    @database = database
    @host = host
    super()
  end

  def setup()
    chain HSQuickLook::MongoDBClient
    with_parameters(host: @host,
                    database: @database)

    chain HSQuickLook::WaitFor
    with_parameters(time: 100000)

    chain HSQuickLook::AnalyzerModuleExample1

    chain HSQuickLook::AnalyzerModuleExample2
    with_parameters(filename: "image.png",
                    height: 600,
                    width: 600)
  end
end

database = ( ARGV[0] or "quicklook" )
host = ( ARGV[1] or "localhost" )

a = AnalyzerExample.new(database, host)
a.run(1000000, 1)
