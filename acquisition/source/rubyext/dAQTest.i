%module dAQTest
%{
// include headers of my modules
#include "MongoDBClient.hh"
#include "WaitFor.hh"
#include "DAQ2.hh"
#include "DAQ3.hh"

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

class DAQ2 : public anlnext::BasicModule
{
public:
  DAQ2();
};

class DAQ3 : public anlnext::BasicModule
{
public:
  DAQ3();
};

}
