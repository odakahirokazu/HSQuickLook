#include "AnalyzerModuleExample2.hh"

#include <cstdint>
#include <fstream>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"
#include "DocumentBuilder.hh"

using namespace anlnext;

namespace hsquicklook {

AnalyzerModuleExample2::AnalyzerModuleExample2()
  : m_Instrument("HXI-1"),
    m_ImageFileName("image.png"),
    m_ImageHeight(600),
    m_ImageWidth(600)
{
}

ANLStatus AnalyzerModuleExample2::mod_define()
{
  define_parameter("instrument", &mod_class::m_Instrument);
  define_parameter("filename", &mod_class::m_ImageFileName);
  define_parameter("width", &mod_class::m_ImageWidth);
  define_parameter("height", &mod_class::m_ImageHeight);
  return AS_OK;
}

ANLStatus AnalyzerModuleExample2::mod_initialize()
{
  get_module_NC("MongoDBClient", &m_MDBClient);
  m_MDBClient->createCappedCollection("image", 100*1024*1024);
  return AS_OK;
}

ANLStatus AnalyzerModuleExample2::mod_analyze()
{
  static int ii(0);
  time_t t(0); time(&t);
  const int64_t ti = static_cast<int64_t>(t)*64;

  const std::size_t size = 10*1024*1024;
  static uint8_t buf[size];
  const std::string filename(m_ImageFileName);
  std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
  fin.read((char*)buf, size);
  const std::size_t readSize = fin.gcount();
  fin.close();

  DocumentBuilder builder("Analysis", "Images");
  builder.setTI(ti);
  builder.setTimeNow();

  {
    const std::string block_name = "Block_images";
    auto block = bsoncxx::builder::stream::document{}
    << "HXI_IMAGE" << make_image_value(buf,
                                       readSize,
                                       m_ImageWidth,
                                       m_ImageHeight,
                                       filename)
    << bsoncxx::builder::stream::finalize;
    builder.addBlock(block_name, block);
  }

  auto doc = builder.generate();
  m_MDBClient->push("image", doc);

  ++ii;

  return AS_OK;
}

} /* namespace hsquicklook */
