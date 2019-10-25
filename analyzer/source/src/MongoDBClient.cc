#include "MongoDBClient.hh"
#include <boost/format.hpp>
#include <bsoncxx/builder/stream/document.hpp>

using namespace anlnext;

namespace hsquicklook
{

MongoDBClient::MongoDBClient()
  : m_MDBHost("localhost"), m_MDBName("hsquicklook")
{
}

ANLStatus MongoDBClient::mod_define()
{
  define_parameter("host", &mod_class::m_MDBHost);
  define_parameter("database", &mod_class::m_MDBName);

  return AS_OK;
}

ANLStatus MongoDBClient::mod_initialize()
{
  mongocxx::uri uri((boost::format("mongodb://%s:27017")%m_MDBHost).str());
  m_Client.reset(new mongocxx::client(uri));
  m_DB = m_Client->database(m_MDBName);

  return AS_OK;
}

void MongoDBClient::createCappedCollection(const std::string& name, const int size)
{
  using bsoncxx::builder::stream::document;
  using bsoncxx::builder::stream::finalize;

  if (!m_DB.has_collection(name)) {
    auto doc = bsoncxx::builder::stream::document{};
    m_DB.create_collection(name,
                           doc <<
                           "capped" << true <<
                           "size" << size << finalize);
  }
}

void MongoDBClient::push(const std::string& collection, const bsoncxx::document::value& doc)
{
  mongocxx::collection col = m_DB[collection];
  col.insert_one(doc.view());
}

} /* namespace hsquicklook */
