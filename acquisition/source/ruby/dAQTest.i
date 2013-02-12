%module dAQTest
%{
// include headers of my modules
#include "MongoDBClient.hh"
#include "WaitFor.hh"
#include "DAQ2.hh"
#include "DAQ3.hh"

%}

%include "std_vector.i"
%include "anl.i"


// interface to my modules
namespace hxisgd {

class MongoDBClient : public anl::BasicModule
{
public:
  MongoDBClient();
  ~MongoDBClient();
};

class WaitFor : public anl::BasicModule
{
public:
  WaitFor();
  ~WaitFor();
};

}

class DAQ2 : public anl::BasicModule
{
public:
  DAQ2();
  ~DAQ2();
};

class DAQ3 : public anl::BasicModule
{
public:
  DAQ3();
  ~DAQ3();
};
