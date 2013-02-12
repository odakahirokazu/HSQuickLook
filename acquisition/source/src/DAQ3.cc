#include "DAQ3.hh"

#include <cstdlib>
#include <fstream>
#include "MongoDBClient.hh"

using namespace anl;

DAQ3::DAQ3()
  : m_Connection(0),
    m_Instrument("HXI-1"),
    m_ImageFileName("image.png"), m_ImageHeight(600), m_ImageWidth(600)
{
}


DAQ3::~DAQ3()
{
}


ANLStatus DAQ3::mod_startup()
{
  register_parameter(&m_Instrument, "Instrument");
  register_parameter(&m_ImageFileName, "Image file");
  register_parameter(&m_ImageHeight, "Image height");
  register_parameter(&m_ImageWidth, "Image width");
  return AS_OK;
}


ANLStatus DAQ3::mod_init()
{
  GetANLModuleNC("MongoDBClient", &m_Connection);

  const int size(100*1024*1024);
  const std::string ns("hxiql.image");
  m_Connection->createCappedCollection(ns, size);

  return AS_OK;
}


ANLStatus DAQ3::mod_ana()
{
  const std::string ns("hxiql.image");
  static int ii(0);

  time_t t(0); time(&t);

  mongo::BSONObjBuilder b;
  b << "InstrumentName" << m_Instrument;
  b << "FunctionalObjectName" << "ANALYSIS";
  b << "AttributeSequenceName" << "IMAGES";

  mongo::BSONObjBuilder b1;
  b1 << "BlockName" << "Block_images";
  mongo::BSONObjBuilder b1c;
  {
    mongo::BSONObjBuilder bimg;
    {
      const size_t SIZE = 10*1024*1024;
      static char buf[SIZE];
      std::string filename(m_ImageFileName);
      std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
      fin.read(buf, SIZE);
      size_t readSize = fin.gcount();
      
      bimg.append("DataType", "image");
      bimg.append("FileName", m_ImageFileName);
      bimg.append("Size", static_cast<int>(readSize));
      bimg.appendBinData("Data", readSize, mongo::BinDataGeneral, buf);
      bimg.append("Height", m_ImageHeight);
      bimg.append("Width", m_ImageWidth);
    }
    b1c << "HXI_IMAGE" << bimg.obj();
  }
  b1 << "Contents" << b1c.obj();
  
  mongo::BSONArrayBuilder bab;
  bab << b1.obj();
  b << "Contents" << bab.arr();
  
  mongo::BSONObj p = b.obj();
  m_Connection->insert(ns, p);

  ++ii;

  return AS_OK;
}
