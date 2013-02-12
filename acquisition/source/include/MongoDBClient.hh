/**
 * MongoDB client module
 *
 * @author Hirokazu Odaka
 * @date 2013-01-06
 *
 */

#ifndef HXISGD_MongoDBClient_HH
#define HXISGD_MongoDBClient_HH 1

#include "BasicModule.hh"
#include <mongo/client/dbclient.h>
#include <mongo/bson/bsonobjbuilder.h>

namespace hxisgd {

class MongoDBClient : public anl::BasicModule
{
public:
  MongoDBClient();
  ~MongoDBClient();

  std::string module_name() const { return "MongoDBClient"; }
  std::string module_version() const { return "1.0"; }
  
  anl::ANLStatus mod_startup();
  anl::ANLStatus mod_init();

  bool createCollection(const std::string& ns, long long size=0,
                        bool capped=false, int max=0, mongo::BSONObj* info=0)
  { return m_Connection->createCollection(ns, size, capped, max, info); }
  
  bool createCappedCollection(const std::string& ns, long long size=0)
  { return createCollection(ns, size, true); }

  void insert(const std::string& ns, const mongo::BSONObj& obj, int flags=0)
  { m_Connection->insert(ns, obj, flags); }

  void insert(const std::string &ns, const std::vector<mongo::BSONObj>& v, int flags=0)
  { m_Connection->insert(ns, v, flags); }

  mongo::DBClientConnection& getDBClientConnection()
  { return *m_Connection; }
  
private:
  mongo::DBClientConnection* m_Connection;
  std::string m_MDBHost;
  std::string m_MDBName;
};

} // namespace hxisgd

#endif /* HXISGD_MongoDBClient_HH */
