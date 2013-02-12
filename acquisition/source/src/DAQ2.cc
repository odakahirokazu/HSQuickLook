#include "DAQ2.hh"

#include <cstdlib>
#include <fstream>
#include "MongoDBClient.hh"

using namespace anl;

DAQ2::DAQ2()
  : m_Connection(0),
    m_Instrument("HXI-1")
{
}


DAQ2::~DAQ2()
{
}


ANLStatus DAQ2::mod_startup()
{
  register_parameter(&m_Instrument, "Instrument");

  return AS_OK;
}


ANLStatus DAQ2::mod_init()
{
  GetANLModuleNC("MongoDBClient", &m_Connection);

  const int size(1*1024*1024);
  const std::string nsMain("hxiql.main");
  m_Connection->createCappedCollection(nsMain, size);

  return AS_OK;
}


ANLStatus DAQ2::mod_ana()
{
  const std::string nsMain("hxiql.main");
  static int ii(0);

  time_t t(0); time(&t);

  mongo::BSONObjBuilder b;
  b << "InstrumentName" << m_Instrument;
  b << "FunctionalObjectName" << "DE";
  b << "AttributeSequenceName" << "USER_HK";
  
  mongo::BSONObjBuilder b1c;
  b1c << "Detector" << m_Instrument
      << "EventID" << ii
      << "Error" << std::rand()%3
      << "Time" << static_cast<int>(t);
  
  mongo::BSONObjBuilder b1;
  b1 << "BlockName" << "Block_1";
  b1 << "Contents" << b1c.obj();
  
  mongo::BSONObjBuilder b2c;
  b2c << "Detector" << m_Instrument
      << "EventID" << ii
      << "Error" << std::rand()%3
      << "Time" << static_cast<int>(t);
  
  mongo::BSONObjBuilder b2;
  b2 << "BlockName" << "Block_2";
  b2 << "Contents" << b2c.obj();
  
  mongo::BSONArrayBuilder bab;
  bab << b1.obj() << b2.obj();
  
  b << "Blocks" << bab.arr();
  
  mongo::BSONObj p = b.obj();
  m_Connection->insert(nsMain, p);

  ++ii;

  return AS_OK;
}
