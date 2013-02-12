#include "DAQ.hh"

#include <cstdlib>
#include <fstream>
#include <boost/format.hpp>
#include "MongoDBClient.hh"

using namespace anl;

DAQ::DAQ()
  : m_Connection(0),
    m_Instrument("HXI-1"),
    m_ImageFileName("image.png"), m_ImageHeight(600), m_ImageWidth(600)
{
}


DAQ::~DAQ()
{
}


ANLStatus DAQ::mod_startup()
{
  register_parameter(&m_Instrument, "Instrument");

  register_parameter(&m_ImageFileName, "Image file");
  register_parameter(&m_ImageHeight, "Image height");
  register_parameter(&m_ImageWidth, "Image width");

  return AS_OK;
}


ANLStatus DAQ::mod_init()
{
  GetANLModuleNC("MongoDBClient", &m_Connection);

  const int size(1*1024*1024);
  const std::string nsMain("hxiql.main");
  const std::string nsScaler("hxiql.scaler");
  const std::string nsImage("hxiql.image");

  m_Connection->createCappedCollection(nsMain, size);
  m_Connection->createCappedCollection(nsScaler, size);
  m_Connection->createCappedCollection(nsImage, size*100);

  return AS_OK;
}


ANLStatus DAQ::mod_ana()
{
  using boost::format;

  const std::string nsMain("hxiql.main");
  const std::string nsScaler("hxiql.scaler");
  const std::string nsImage("hxiql.image");

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
    std::string filename(m_ImageFileName);
    std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
    fin.read(buf, SIZE);
    size_t readSize = fin.gcount();
    
    mongo::BSONObjBuilder b;
    mongo::BSONObjBuilder b1;
    b1.append("FileName", m_ImageFileName);
    b1.append("Size", static_cast<int>(readSize));
    b1.appendBinData("Data", readSize, mongo::BinDataGeneral, buf);
    b1.append("Height", m_ImageHeight);
    b1.append("Width", m_ImageWidth);
    b.append("Image", b1.obj());
    mongo::BSONObj p = b.obj();
    
    m_Connection->insert(nsImage, p);
  }
    
  ++ii;

  return AS_OK;
}
