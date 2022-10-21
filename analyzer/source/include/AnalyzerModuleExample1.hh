#ifndef HSQUICKLOOK_AnalyzerModuleExample1_H
#define HSQUICKLOOK_AnalyzerModuleExample1_H 1

#include <anlnext/BasicModule.hh>
#include <random>

namespace hsquicklook {

class MongoDBClient;

class AnalyzerModuleExample1 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(AnalyzerModuleExample1, 3.0);
public:
  AnalyzerModuleExample1();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_analyze() override;

private:
  MongoDBClient* mongodb_client_ = nullptr;
  std::mt19937 random_engine_;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_AnalyzerModuleExample1_H */
