/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HXISGD_WaitFor_HH
#define HXISGD_WaitFor_HH

#include "BasicModule.hh"

namespace hxisgd
{

class WaitFor : public anl::BasicModule
{
public:
  WaitFor();
  ~WaitFor();

  std::string module_name() const { return "WaitFor"; }
  std::string module_version() const { return "1.0"; }
  
  anl::ANLStatus mod_startup();
  anl::ANLStatus mod_ana();

private:
  int wait;
};

} // namespace hxisgd

#endif /* HXISGD_WaitFor_HH */
