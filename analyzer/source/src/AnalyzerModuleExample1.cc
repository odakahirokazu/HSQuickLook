#include "AnalyzerModuleExample1.hh"

#include <cstdint>
#include <cmath>
#include <boost/format.hpp>
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

  std::random_device seed_gen;
  random_engine_.seed(seed_gen());

  return AS_OK;
}

ANLStatus AnalyzerModuleExample1::mod_analyze()
{
  static int ii(0);
  time_t t(0); time(&t);
  const int64_t ti = static_cast<int64_t>(t)*64;
  static int count1(0);
  static int count2(0);
  static uint16_t flags1(0u);
  static uint16_t flags2(0u);
  static std::vector<int> temperatures{500, 500, 500, 500, 500};

  std::normal_distribution<> gaussian(0.0, 1.0);
  std::uniform_int_distribution<> uniform;

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
      << "Flags" << flags1
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
      << "Flags" << flags2
      << "Time" << static_cast<int>(t)
      << bsoncxx::builder::stream::finalize;
    builder.addSection(section_name, section);
  }

  {
    const std::string section_name = "Temperature";
    auto section_stream = bsoncxx::builder::stream::document{};
    section_stream
      << "EventID" << ii
      << "Count" << count2;
    for (std::size_t k=0; k<temperatures.size(); k++) {
      section_stream << (boost::format("Temperature%d") % k).str() << temperatures[k];
    }
    auto section = section_stream
      << "Time" << static_cast<int>(t)
      << bsoncxx::builder::stream::finalize;
    builder.addSection(section_name, section);
  }

  auto doc = builder.generate();
  mongodb_client_->push("main", doc);

  ++ii;
  count1 += std::abs(std::round(500+25.0*gaussian(random_engine_)));
  count2 += std::abs(std::round(1000+50.0*gaussian(random_engine_)));
  flags1 = uniform(random_engine_) & 0xFFFF;
  flags2 = uniform(random_engine_) & 0xFFFF;
  for (auto& temperature: temperatures) {
    temperature += std::round(40.0*gaussian(random_engine_));
  }

  return AS_OK;
}

} /* namespace hsquicklook */
