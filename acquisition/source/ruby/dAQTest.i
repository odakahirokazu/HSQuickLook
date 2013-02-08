%module dAQTest
%{
// include headers of my modules
#include "DAQ.hh"
#include "DAQ2.hh"

%}

%include "std_vector.i"
%include "anl.i"


// interface to my modules

class DAQ : public anl::BasicModule
{
public:
  DAQ();
  ~DAQ();
};

class DAQ2 : public anl::BasicModule
{
public:
  DAQ2();
  ~DAQ2();
};
