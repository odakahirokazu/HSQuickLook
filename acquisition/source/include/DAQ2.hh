/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef DAQ2_HH
#define DAQ2_HH

#include "BasicModule.hh"

namespace mongo { class DBClientConnection; }

class DAQ2 : public anl::BasicModule
{
public:
  DAQ2();
  ~DAQ2();

  std::string module_name() const { return "DAQ2"; }
  std::string module_version() const { return "1.0"; }
  
  anl::ANLStatus mod_startup();
  anl::ANLStatus mod_init();
  anl::ANLStatus mod_bgnrun();
  anl::ANLStatus mod_ana();


private:
  mongo::DBClientConnection *m_Connection;
  std::string m_MDBHost;
  std::string m_MDBName;
  std::string m_Instrument;
};

#endif // DAQ2_HH
