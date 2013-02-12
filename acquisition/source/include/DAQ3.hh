/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef DAQ3_HH
#define DAQ3_HH

#include "BasicModule.hh"

namespace hxisgd { class MongoDBClient; }

class DAQ3 : public anl::BasicModule
{
public:
  DAQ3();
  ~DAQ3();

  std::string module_name() const { return "DAQ3"; }
  std::string module_version() const { return "1.0"; }
  
  anl::ANLStatus mod_startup();
  anl::ANLStatus mod_init();
  anl::ANLStatus mod_ana();

private:
  hxisgd::MongoDBClient* m_Connection;
  std::string m_Instrument;
  std::string m_ImageFileName;
  int m_ImageHeight;
  int m_ImageWidth;
};

#endif // DAQ3_HH
