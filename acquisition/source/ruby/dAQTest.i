%module dAQTest
%{
// include headers of my modules
#include "DAQ.hh"

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
