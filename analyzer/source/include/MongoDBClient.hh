/**
 * MongoDB client module
 *
 * @author Hirokazu Odaka
 * @date 2013-01-06
 * @date 2019-10-09 | version 2.0
 *
 */

#ifndef HSQUICKLOOK_MongoDBClient_H
#define HSQUICKLOOK_MongoDBClient_H 1

#include <memory>
#include <anlnext/BasicModule.hh>
#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/database.hpp>
#include <bsoncxx/document/value.hpp>

namespace hsquicklook {

class MongoDBClient : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(MongoDBClient, 2.0);
public:
  MongoDBClient();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;

  void createCappedCollection(const std::string& name, int size);
  void push(const std::string& collection, const bsoncxx::document::value& doc);

  mongocxx::database& getDatabase()
  { return m_DB; }
  
private:
  mongocxx::instance m_MDBInstance;
  std::unique_ptr<mongocxx::client> m_Client;
  mongocxx::database m_DB;
  std::string m_MDBHost;
  std::string m_MDBName;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_MongoDBClient_H */
