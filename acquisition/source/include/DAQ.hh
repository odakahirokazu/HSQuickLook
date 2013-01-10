/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef DAQ_HH
#define DAQ_HH

#include "BasicModule.hh"

namespace mongo { class DBClientConnection; }

class DAQ : public anl::BasicModule
{
public:
  DAQ();
  ~DAQ();

  std::string module_name() const { return "DAQ"; }
  std::string module_version() const { return "1.0"; }
  
  anl::ANLStatus mod_startup();
  anl::ANLStatus mod_init();
  anl::ANLStatus mod_his();
  anl::ANLStatus mod_bgnrun();
  anl::ANLStatus mod_ana();
  anl::ANLStatus mod_endrun();
  anl::ANLStatus mod_exit();

private:
  mongo::DBClientConnection *m_Connection;
  std::string m_MDBHost;
  std::string m_MDBName;
  std::string m_Instrument;
};

#endif // DAQ_HH
