#include "MongoDBClient.hh"
#include <boost/format.hpp>

using namespace anlnext;

namespace hsquicklook
{

MongoDBClient::MongoDBClient()
  : m_MDBHost("localhost"), m_MDBName("hxiql")
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

} /* namespace hsquicklook */
