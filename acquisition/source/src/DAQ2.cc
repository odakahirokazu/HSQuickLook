#include "DAQ2.hh"

#include <cstdlib>
#include <fstream>
#include <unistd.h>
#include <boost/format.hpp>
#include <mongo/client/dbclient.h>
#include <mongo/bson/bsonobjbuilder.h>

using namespace anl;

DAQ2::DAQ2()
  : m_MDBHost("localhost"), m_MDBName("hxiql"),
    m_Instrument("HXI-1")
{
  m_Connection = new mongo::DBClientConnection;
}


DAQ2::~DAQ2()
{
}


ANLStatus DAQ2::mod_startup()
{
  register_parameter(&m_MDBHost, "MongoDB host");
  register_parameter(&m_MDBName, "Database name");
  register_parameter(&m_Instrument, "Instrument");

  return AS_OK;
}


ANLStatus DAQ2::mod_init()
{
  try {
    m_Connection->connect(m_MDBHost);
  }
  catch (mongo::DBException& e) {
    std::cout << "caught " << e.what() << std::endl;
    return AS_QUIT_ERR;
  }

  return AS_OK;
}


ANLStatus DAQ2::mod_bgnrun()
{
  const std::string dbName(m_MDBName);
  const std::string nsMain(dbName+".main");

  const int size = 1*1024*1024;
  const bool capped = true;

  m_Connection->createCollection(nsMain, size, capped);

  return AS_OK;
}


ANLStatus DAQ2::mod_ana()
{
  using boost::format;

  const std::string dbName(m_MDBName);
  const std::string nsMain(dbName+".main");
  static int ii(0);

  {
    time_t t(0); time(&t);

    mongo::BSONObjBuilder b;
    b << "InstrumentName" << m_Instrument;
    b << "FunctionalObjectName" << "DE";
    if (ii%4==0) {
      b << "AttributeSequenceName" << "USER_HK";
    }
    else {
      b << "AttributeSequenceName" << "SYS_HK";
    }
    b << "";

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

    b << "Contents" << bab.arr();

    mongo::BSONObj p = b.obj();
    m_Connection->insert(nsMain, p);
  }
    
  usleep(100000);

  ++ii;

  return AS_OK;
}
