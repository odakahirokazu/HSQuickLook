#include "WaitFor.hh"
#include "unistd.h"

using namespace anl;
using namespace hxisgd;


WaitFor::WaitFor()
  : wait(1000000)
{
}


WaitFor::~WaitFor()
{
}


ANLStatus WaitFor::mod_startup()
{
  register_parameter(&wait, "Time us");
  return AS_OK;
}


ANLStatus WaitFor::mod_ana()
{
  usleep(wait);
  return AS_OK;
}
