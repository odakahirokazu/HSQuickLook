#include "WaitFor.hh"
#include "unistd.h"

using namespace anlnext;

namespace hsquicklook {

WaitFor::WaitFor()
  : wait_(1000000)
{
}

ANLStatus WaitFor::mod_define()
{
  define_parameter("time", &mod_class::wait_);
  return AS_OK;
}

ANLStatus WaitFor::mod_analyze()
{
  usleep(wait_);
  return AS_OK;
}

} /* namespace hsquicklook */
