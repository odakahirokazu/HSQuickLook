#include "MongoDBClient.hh"

using namespace anl;

namespace hxisgd
{

MongoDBClient::MongoDBClient()
  : m_MDBHost("localhost"), m_MDBName("hxiql")
{
  m_Connection = new mongo::DBClientConnection;
}


MongoDBClient::~MongoDBClient()
{
  delete m_Connection;
}


ANLStatus MongoDBClient::mod_startup()
{
  register_parameter(&m_MDBHost, "MongoDB host");
  register_parameter(&m_MDBName, "Database name");

  return AS_OK;
}


ANLStatus MongoDBClient::mod_init()
{
  try {
    m_Connection->connect(m_MDBHost);
  }
  catch (mongo::DBException& e) {
    std::cout << "Exception: " << e.what() << std::endl;
    return AS_QUIT_ERR;
  }

  return AS_OK;
}

} // namespace hxisgd
