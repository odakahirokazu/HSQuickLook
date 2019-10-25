#include "AnalyzerModuleExample1.hh"

#include <cstdint>
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"
#include "DocumentBuilder.hh"

using namespace anlnext;

namespace hsquicklook {

AnalyzerModuleExample1::AnalyzerModuleExample1()
  : m_Instrument("HXI-1")
{
}

ANLStatus AnalyzerModuleExample1::mod_define()
{
  define_parameter("instrument", &mod_class::m_Instrument);
  return AS_OK;
}

ANLStatus AnalyzerModuleExample1::mod_initialize()
{
  get_module_NC("MongoDBClient", &m_MDBClient);
  m_MDBClient->createCappedCollection("main", 1*1024*1024);
  return AS_OK;
}

ANLStatus AnalyzerModuleExample1::mod_analyze()
{
  static int ii(0);
  time_t t(0); time(&t);
  const int64_t ti = static_cast<int64_t>(t)*64;

  DocumentBuilder builder("DE", "USER_HK");
  builder.setTI(ti);
  builder.setTimeNow();

  {
    const std::string block_name = "Block_1";
    auto block = bsoncxx::builder::stream::document{}
    << "Detector" << m_Instrument
    << "EventID" << ii
    << "Error" << std::rand()%3
    << "Time" << static_cast<int>(t)
    << bsoncxx::builder::stream::finalize;
    builder.addBlock(block_name, block);
  }

  {
    const std::string block_name = "Block_2";
    auto block = bsoncxx::builder::stream::document{}
    << "Detector" << m_Instrument
    << "EventID" << ii
    << "Error" << std::rand()%3
    << "Time" << static_cast<int>(t)
    << bsoncxx::builder::stream::finalize;
    builder.addBlock(block_name, block);
  }

  auto doc = builder.generate();
  m_MDBClient->push("main", doc);

  ++ii;

  return AS_OK;
}

} /* namespace hsquicklook */
