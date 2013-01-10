#include "DAQ.hh"

#include <cstdlib>
#include <fstream>
#include <unistd.h>
#include <boost/format.hpp>
#include <mongo/client/dbclient.h>
#include <mongo/bson/bsonobjbuilder.h>

using namespace anl;

DAQ::DAQ()
  : m_MDBHost("localhost"), m_MDBName("hxiql"),
    m_Instrument("HXI-1")
{
  m_Connection = new mongo::DBClientConnection;
}


DAQ::~DAQ()
{
}


ANLStatus DAQ::mod_startup()
{
  register_parameter(&m_MDBHost, "MongoDB host");
  register_parameter(&m_MDBName, "Database name");
  register_parameter(&m_Instrument, "Instrument");
  return AS_OK;
}


ANLStatus DAQ::mod_init()
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


ANLStatus DAQ::mod_his()
{
  return AS_OK;
}


ANLStatus DAQ::mod_bgnrun()
{
  const std::string dbName(m_MDBName);
  const std::string nsMain(dbName+".main");
  const std::string nsScaler(dbName+".scaler");
  const std::string nsImage(dbName+".image");

  const int size = 1*1024*1024;
  const bool capped = true;

  m_Connection->createCollection(nsMain, size, capped);
  m_Connection->createCollection(nsScaler, size, capped);
  m_Connection->createCollection(nsImage, size*100, capped);

  return AS_OK;
}


ANLStatus DAQ::mod_ana()
{
  using boost::format;

  const std::string dbName(m_MDBName);
  const std::string nsMain(dbName+".main");
  const std::string nsScaler(dbName+".scaler");
  const std::string nsImage(dbName+".image");

  static int ii(0);

  {
    time_t t(0); time(&t);

    mongo::BSONObjBuilder b;
    b << "Detector" << m_Instrument
      << "EventID" << ii
      << "Error" << std::rand()%3
      << "Time" << static_cast<int>(t);

    mongo::BSONObj p = b.obj();
    
    // m_Connection->update(dbName, BSON("Detector" << m_Instrument), p, true);
    m_Connection->insert(nsMain, p);
  }

  {
    mongo::BSONObjBuilder b;
    for (int si=0; si<100; si++) {
      b << (format("Scaler %d") % si).str() << 50.0*std::rand()/RAND_MAX;
    }
    mongo::BSONObj p = b.obj();
    
    m_Connection->insert(nsScaler, p);
  }

  //  if (ii%60==0) {
  if (ii%10==0) {
    const size_t SIZE = 10*1024*1024;
    static char buf[SIZE];
    std::string filename("image.png");
    std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
    fin.read(buf, SIZE);
    size_t readSize = fin.gcount();
    
    mongo::BSONObjBuilder b;
    mongo::BSONObjBuilder b1;
    b1.append("FileName", filename);
    b1.append("Size", static_cast<int>(readSize));
    b1.appendBinData("Data", readSize, mongo::BinDataGeneral, buf);
    b.append("Image", b1.obj());
    mongo::BSONObj p = b.obj();
    
    m_Connection->insert(nsImage, p);
  }
    
  usleep(100000);

  ++ii;

  return AS_OK;
}


ANLStatus DAQ::mod_endrun()
{
  return AS_OK;
}


ANLStatus DAQ::mod_exit()
{
  return AS_OK;
}
