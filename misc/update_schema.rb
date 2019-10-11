#!/usr/bin/env ruby

Dir::glob("schema/*/*.js") do |filename|
  original = filename+".org"
  File.rename(filename, original)
  File.open(filename, 'w') do |fout|
    File.open(original) do |fin|
      fin.each_line do |line|
        fout.puts line.sub("functionalObject", "directory").sub("attributeSequence", "document")
      end
    end
  end
end
