Dir::glob("*.js") do |file|
  s = nil
  File.open(file){|fin|
      s = fin.read
      s.sub!("hk1", "hxi1")
      fin.write(s)
  }
end
