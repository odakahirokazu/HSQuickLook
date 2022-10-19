#include "AnalyzerModuleExample1.hh"

#include <cstdint>
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"
#include "DocumentBuilder.hh"

using namespace anlnext;

namespace hsquicklook {

AnalyzerModuleExample1::AnalyzerModuleExample1()
{
}

ANLStatus AnalyzerModuleExample1::mod_define()
{
  return AS_OK;
}

ANLStatus AnalyzerModuleExample1::mod_initialize()
{
  get_module_NC("MongoDBClient", &mongodb_client_);
  mongodb_client_->createCappedCollection("main", 1*1024*1024);

  return AS_OK;
}

ANLStatus AnalyzerModuleExample1::mod_analyze()
{
  static int ii(0);
  time_t t(0); time(&t);
  const int64_t ti = static_cast<int64_t>(t)*64;
  static int count1(0);
  static int count2(0);

  DocumentBuilder builder("Detector", "BasicStatus");
  builder.setTI(ti);
  builder.setTimeNow();

  {
    const std::string section_name = "Detector_1";
    auto section = bsoncxx::builder::stream::document{}
      << "Detector" << "Main Detector 101"
      << "EventID" << ii
      << "Error" << std::rand()%3
      << "Count" << count1
      << "Time" << static_cast<int>(t)
      << bsoncxx::builder::stream::finalize;
    builder.addSection(section_name, section);
  }

  {
    const std::string section_name = "Detector_2";
    auto section = bsoncxx::builder::stream::document{}
      << "Detector" << "Main Detector 102"
      << "EventID" << ii
      << "Error" << std::rand()%3
      << "Count" << count2
      << "Time" << static_cast<int>(t)
      << bsoncxx::builder::stream::finalize;
    builder.addSection(section_name, section);
  }

  auto doc = builder.generate();
  mongodb_client_->push("main", doc);

  ++ii;
  count1 += 500 + std::rand()%25;
  count2 += 20000 + std::rand()%200;

  return AS_OK;
}

} /* namespace hsquicklook */
