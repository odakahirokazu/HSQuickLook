#include "DAQ2.hh"

#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>
#include "MongoDBClient.hh"

using namespace anlnext;

namespace hsquicklook {

DAQ2::DAQ2()
  : m_Instrument("HXI-1")
{
}

ANLStatus DAQ2::mod_define()
{
  define_parameter("instrument", &mod_class::m_Instrument);
  return AS_OK;
}

ANLStatus DAQ2::mod_initialize()
{
  using bsoncxx::builder::stream::document;
  using bsoncxx::builder::stream::finalize;

  get_module_NC("MongoDBClient", &m_MDBClient);
  mongocxx::database& db = m_MDBClient->getDatabase();

  const int size(1*1024*1024);
  const std::string dbName("main");
  if (!db.has_collection(dbName)) {
    auto doc = bsoncxx::builder::stream::document{};
    db.create_collection(dbName,
                         doc <<
                         "capped" << true <<
                         "size" << size << finalize);
  }

  return AS_OK;
}

ANLStatus DAQ2::mod_analyze()
{
  using bsoncxx::builder::stream::close_array;
  using bsoncxx::builder::stream::close_document;
  using bsoncxx::builder::stream::document;
  using bsoncxx::builder::stream::finalize;
  using bsoncxx::builder::stream::open_array;
  using bsoncxx::builder::stream::open_document;

  mongocxx::database& db = m_MDBClient->getDatabase();
  mongocxx::collection col = db["main"];
  auto doc = bsoncxx::builder::stream::document{};

  static int ii(0);
  time_t t(0); time(&t);

  bsoncxx::document::value docValue
    = doc
    << "TI" << static_cast<int>(t)
    << "UNIXTIME" << static_cast<int>(t)
    << "InstrumentName" << m_Instrument
    << "Directory" << "DE"
    << "Document" << "USER_HK"
    << "Blocks" << open_array
    << open_document
    << "BlockName" << "Block_1"
    << "Contents"
    << open_document
    << "Detector" << m_Instrument
    << "EventID" << ii
    << "Error" << std::rand()%3
    << "Time" << static_cast<int>(t)
    << close_document
    << close_document
    << open_document
    << "BlockName" << "Block_2"
    << "Contents"
    << open_document
    << "Detector" << m_Instrument
    << "EventID" << ii
    << "Error" << std::rand()%3
    << "Time" << static_cast<int>(t)
    << close_document
    << close_document
    << close_array
    << finalize;
  col.insert_one(docValue.view());

  ++ii;

  return AS_OK;
}

} /* namespace hsquicklook */
