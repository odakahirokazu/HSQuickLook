#ifndef HSQUICKLOOK_AnalyzerModuleExample2_H
#define HSQUICKLOOK_AnalyzerModuleExample2_H 1

#include <anlnext/BasicModule.hh>

namespace hsquicklook {

class MongoDBClient;

class AnalyzerModuleExample2 : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(AnalyzerModuleExample2, 3.0);
public:
  AnalyzerModuleExample2();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_analyze() override;

  private:
  MongoDBClient* mongodb_client_ = nullptr;
  std::string image_filename_;
  int image_height_ = 0;
  int image_width_ = 0;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_AnalyzerModuleExample2_H */
