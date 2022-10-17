#include "MongoDBClient.hh"
#include <boost/format.hpp>
#include <bsoncxx/builder/stream/document.hpp>

using namespace anlnext;

namespace hsquicklook
{

MongoDBClient::MongoDBClient()
  : m_MDBHost("localhost"),
    m_MDBPort(27017),
    m_MDBName("hsquicklook"),
    m_MDBInstantiation(true)
{
}

ANLStatus MongoDBClient::mod_define()
{
  define_parameter("host", &mod_class::m_MDBHost);
  define_parameter("port", &mod_class::m_MDBPort);
  define_parameter("database", &mod_class::m_MDBName);
  define_parameter("instantiation", &mod_class::m_MDBInstantiation);

  return AS_OK;
}

ANLStatus MongoDBClient::mod_initialize()
{
  if (m_MDBInstantiation) {
    m_MDBInstance = std::make_unique<mongocxx::instance>();
  }
  mongocxx::uri uri((boost::format("mongodb://%s:%d") % m_MDBHost % m_MDBPort).str());
  m_Client.reset(new mongocxx::client(uri));
  m_DB = m_Client->database(m_MDBName);

  return AS_OK;
}

ANLStatus MongoDBClient::mod_finalize()
{
  if (m_MDBInstantiation) {
    m_MDBInstance.reset();
  }

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

void MongoDBClient::createCollection(const std::string& name)
{
  using bsoncxx::builder::stream::document;
  using bsoncxx::builder::stream::finalize;

  if (!m_DB.has_collection(name)) {
    auto doc = bsoncxx::builder::stream::document{};
    m_DB.create_collection(name,
                           doc <<
                           "capped" << false << finalize);
  }
}

void MongoDBClient::push(const std::string& collection, const bsoncxx::document::value& doc)
{
  mongocxx::collection col = m_DB[collection];
  col.insert_one(doc.view());
}

void MongoDBClient::push_many(const std::string& collection, std::vector<bsoncxx::document::value>& docs)
{
  mongocxx::collection col = m_DB[collection];
  if (docs.size() > 0) {
    col.insert_many(docs);
  }
}

bsoncxx::stdx::optional<bsoncxx::document::value> MongoDBClient::find_one(const std::string& collection, const bsoncxx::document::value& constraints)
{
  mongocxx::collection col = m_DB[collection];
  return col.find_one(constraints.view());
}

mongocxx::cursor MongoDBClient::find(const std::string& collection, const bsoncxx::document::value& constraints)
{
  mongocxx::collection col = m_DB[collection];
  return col.find(constraints.view());
}

mongocxx::cursor MongoDBClient::aggregate(const std::string& collection, const mongocxx::pipeline& pipeline)
{
  mongocxx::collection col = m_DB[collection];
  return col.aggregate(pipeline, mongocxx::options::aggregate{});
}

void MongoDBClient::update(const std::string& collection, const bsoncxx::document::value& constraints, bsoncxx::document::value& doc)
{
  mongocxx::collection col = m_DB[collection];
  col.update_one(constraints.view(), doc.view());
}

void MongoDBClient::update_many(const std::string& collection, const bsoncxx::document::value& constraints, bsoncxx::document::value& doc, bsoncxx::array::value& array_filters)
{
  mongocxx::collection col = m_DB[collection];
  mongocxx::options::update options;
  options.array_filters(array_filters.view());
  col.update_many(constraints.view(), doc.view(), options);
}

} /* namespace hsquicklook */
