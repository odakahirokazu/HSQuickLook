#include "DAQ3.hh"

#include <fstream>
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"

using namespace anlnext;

namespace hsquicklook {

DAQ3::DAQ3()
  : m_Instrument("HXI-1"),
    m_ImageFileName("image.png"),
    m_ImageHeight(600),
    m_ImageWidth(600)
{
}

ANLStatus DAQ3::mod_define()
{
  define_parameter("instrument", &mod_class::m_Instrument);
  define_parameter("filename", &mod_class::m_ImageFileName);
  define_parameter("width", &mod_class::m_ImageWidth);
  define_parameter("height", &mod_class::m_ImageHeight);
  return AS_OK;
}

ANLStatus DAQ3::mod_initialize()
{
  get_module_NC("MongoDBClient", &m_MDBClient);
  m_MDBClient->createCappedCollection("image", 100*1024*1024);
  return AS_OK;
}

ANLStatus DAQ3::mod_analyze()
{
  using bsoncxx::builder::stream::close_array;
  using bsoncxx::builder::stream::close_document;
  using bsoncxx::builder::stream::document;
  using bsoncxx::builder::stream::finalize;
  using bsoncxx::builder::stream::open_array;
  using bsoncxx::builder::stream::open_document;

  mongocxx::database& db = m_MDBClient->getDatabase();
  mongocxx::collection col = db["image"];
  auto doc = bsoncxx::builder::stream::document{};

  static int ii(0);
  time_t t(0); time(&t);

  const uint32_t size = 10*1024*1024;
  static uint8_t buf[size];
  const std::string filename(m_ImageFileName);
  std::ifstream fin(filename.c_str(), std::ios::in|std::ios::binary);
  fin.read((char*)buf, size);
  const uint32_t readSize = fin.gcount();
  fin.close();
  bsoncxx::types::b_binary image{bsoncxx::binary_sub_type::k_binary,
                                 readSize,
                                 buf};

  bsoncxx::document::value docValue
    = doc
    << "InstrumentName" << m_Instrument
    << "Directory" << "Analysis"
    << "Document" << "Images"
    << "Blocks" << open_array
    << open_document
    << "BlockName" << "Block_images"
    << "Contents"
    << open_document
    << "HXI_IMAGE"
    << open_document
    << "DataType" << "image"
    << "FileName" << m_ImageFileName
    << "Size" << static_cast<int>(readSize)
    << "Data" << image
    << "Width" << m_ImageWidth
    << "Height" << m_ImageHeight
    << close_document
    << close_document
    << close_document
    << close_array
    << finalize;
  col.insert_one(docValue.view());

  ++ii;

  return AS_OK;
}

} /* namespace hsquicklook */
