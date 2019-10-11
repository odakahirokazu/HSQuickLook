/**
 * MyModule sample module of the ANL Next framework
 *
 * @author 
 * @date
 *
 */

#ifndef HSQUICKLOOK_WaitFor_H
#define HSQUICKLOOK_WaitFor_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook
{

class WaitFor : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(WaitFor, 2.0);
public:
  WaitFor();
  
  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_analyze() override;

private:
  int wait_;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_WaitFor_H */
