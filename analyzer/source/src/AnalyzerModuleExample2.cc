#include "AnalyzerModuleExample2.hh"

#include <cstdint>
#include <fstream>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"
#include "DocumentBuilder.hh"

using namespace anlnext;

namespace hsquicklook {

AnalyzerModuleExample2::AnalyzerModuleExample2()
  : image_filename_("image.png"),
    image_height_(600),
    image_width_(600)
{
}

ANLStatus AnalyzerModuleExample2::mod_define()
{
  define_parameter("filename", &mod_class::image_filename_);
  define_parameter("width", &mod_class::image_width_);
  define_parameter("height", &mod_class::image_height_);

  return AS_OK;
}

ANLStatus AnalyzerModuleExample2::mod_initialize()
{
  get_module_NC("MongoDBClient", &mongodb_client_);
  mongodb_client_->createCappedCollection("image", 100*1024*1024);
  return AS_OK;
}

ANLStatus AnalyzerModuleExample2::mod_analyze()
{
  static int ii(0);
  const time_t t = std::time(nullptr);
  const int64_t ti = static_cast<int64_t>(t)*64;

  const std::size_t size = 10*1024*1024;
  static uint8_t buf[size];
  const std::string filename(image_filename_);
  std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
  fin.read((char*)buf, size);
  const std::size_t readSize = fin.gcount();
  fin.close();

  DocumentBuilder builder("Analysis", "Images");
  builder.setTI(ti);
  builder.setTimeNow();

  {
    const std::string section_name = "Observation";
    auto section = bsoncxx::builder::stream::document{}
    << "Xray1" << make_image_value(buf,
                                   readSize,
                                   image_width_,
                                   image_height_,
                                   filename)
    << bsoncxx::builder::stream::finalize;
    builder.addSection(section_name, section);
  }

  auto doc = builder.generate();
  mongodb_client_->push("image", doc);

  ++ii;

  return AS_OK;
}

} /* namespace hsquicklook */
