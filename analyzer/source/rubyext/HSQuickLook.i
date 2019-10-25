%module HSQuickLook
%{
// include headers of my modules
#include "MongoDBClient.hh"
#include "WaitFor.hh"
#include "AnalyzerModuleExample1.hh"
#include "AnalyzerModuleExample2.hh"

%}

%include "std_vector.i"
%import(module="anlnext/ANL") "anlnext/ruby/ANL.i"

// interface to my modules
namespace hsquicklook {

class MongoDBClient : public anlnext::BasicModule
{
public:
  MongoDBClient();
};

class WaitFor : public anlnext::BasicModule
{
public:
  WaitFor();
};

class AnalyzerModuleExample1 : public anlnext::BasicModule
{
public:
  AnalyzerModuleExample1();
};

class AnalyzerModuleExample2 : public anlnext::BasicModule
{
public:
  AnalyzerModuleExample2();
};

}
