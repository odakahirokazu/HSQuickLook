/**
 * MongoDB client module
 *
 * @author Hirokazu Odaka
 * @date 2013-01-06
 * @date 2019-10-09 | version 2.0
 * @date 2021-11-02 | version 3.0 | mongo instantiation selectable
 * @date 2022-10-07 | version 3.1 | add a parameter port
 *
 */

#ifndef HSQUICKLOOK_MongoDBClient_H
#define HSQUICKLOOK_MongoDBClient_H 1

#include <memory>
#include <vector>
#include <anlnext/BasicModule.hh>
#include <mongocxx/instance.hpp>
#include <mongocxx/client.hpp>
#include <mongocxx/database.hpp>
#include <bsoncxx/document/value.hpp>

namespace hsquicklook {

class MongoDBClient : public anlnext::BasicModule
{
  DEFINE_ANL_MODULE(MongoDBClient, 3.1);
public:
  MongoDBClient();

  anlnext::ANLStatus mod_define() override;
  anlnext::ANLStatus mod_initialize() override;
  anlnext::ANLStatus mod_finalize() override;

  void createCappedCollection(const std::string& name, int size);
  void createCollection(const std::string& name);
  void push(const std::string& collection, const bsoncxx::document::value& doc);
  void push_many(const std::string& collection, std::vector<bsoncxx::document::value>& docs);
  bsoncxx::stdx::optional<bsoncxx::document::value> find_one(const std::string& collection, const bsoncxx::document::value& constraints);
  mongocxx::cursor find(const std::string& collection, const bsoncxx::document::value& constraints);
  mongocxx::cursor aggregate(const std::string& collection, const mongocxx::pipeline& pipeline);
  void update(const std::string& collection, const bsoncxx::document::value& constraints, bsoncxx::document::value& doc);
  void update_many(const std::string& collection, const bsoncxx::document::value& constraints, bsoncxx::document::value& doc, bsoncxx::array::value& array_filters);

  mongocxx::database& getDatabase()
  { return m_DB; }
  
private:
  std::unique_ptr<mongocxx::instance> m_MDBInstance;
  std::unique_ptr<mongocxx::client> m_Client;
  mongocxx::database m_DB;
  std::string m_MDBHost;
  int m_MDBPort;
  std::string m_MDBName;
  bool m_MDBInstantiation = true;
};

} /* namespace hsquicklook */

#endif /* HSQUICKLOOK_MongoDBClient_H */
