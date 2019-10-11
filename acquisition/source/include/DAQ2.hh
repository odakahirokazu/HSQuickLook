/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HSQUICKLOOK_DAQ2_H
#define HSQUICKLOOK_DAQ2_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook {

class MongoDBClient;

class DAQ2 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(DAQ2, 2.0);

public:
  DAQ2();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_analyze() override;

private:
  MongoDBClient* m_MDBClient = nullptr;
  std::string m_Instrument;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_DAQ2_H */
