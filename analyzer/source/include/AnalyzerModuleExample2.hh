/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HSQUICKLOOK_AnalyzerModuleExample2_H
#define HSQUICKLOOK_AnalyzerModuleExample2_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook {

class MongoDBClient;

class AnalyzerModuleExample2 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(AnalyzerModuleExample2, 2.0);

public:
  AnalyzerModuleExample2();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_analyze() override;

  private:
  MongoDBClient* m_MDBClient = nullptr;
  std::string m_Instrument;
  std::string m_ImageFileName;
  int m_ImageHeight = 0;
  int m_ImageWidth = 0;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_AnalyzerModuleExample2_H */
