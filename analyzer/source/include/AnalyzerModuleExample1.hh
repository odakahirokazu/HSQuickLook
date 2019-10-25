/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HSQUICKLOOK_AnalyzerModuleExample1_H
#define HSQUICKLOOK_AnalyzerModuleExample1_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook {

class MongoDBClient;

class AnalyzerModuleExample1 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(AnalyzerModuleExample1, 2.0);

public:
  AnalyzerModuleExample1();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_analyze() override;

private:
  MongoDBClient* m_MDBClient = nullptr;
  std::string m_Instrument;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_AnalyzerModuleExample1_H */
