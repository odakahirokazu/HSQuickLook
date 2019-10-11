/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HSQUICKLOOK_DAQ3_H
#define HSQUICKLOOK_DAQ3_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook {

class MongoDBClient;

class DAQ3 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(DAQ3, 2.0);

public:
  DAQ3();

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

#endif /* HSQUICKLOOK_DAQ3_H */
