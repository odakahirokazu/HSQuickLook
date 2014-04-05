Dir::glob("*.js") do |file|
  bak = file+".bak"
  File.rename(file, bak)
  s = nil
  File.open(bak){|fin|  s = fin.read }
  s1 = s.sub("qlSchema=", "HSQuickLook.main.schema =")
  File::open(file, 'w'){|fout| fout.write(s1) }
end
