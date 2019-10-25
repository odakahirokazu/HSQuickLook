#include "DocumentBuilder.hh"
#include <bsoncxx/json.hpp>
#include <bsoncxx/builder/stream/document.hpp>

namespace hsquicklook
{

bsoncxx::document::value make_image_value(uint8_t* buf,
                                          uint32_t size,
                                          int width,
                                          int height,
                                          const std::string& filename)
{
  bsoncxx::types::b_binary image{bsoncxx::binary_sub_type::k_binary,
                                 size,
                                 buf};
  bsoncxx::document::value value = bsoncxx::builder::stream::document{}
  << "DataType" << "image"
  << "FileName" << filename
  << "Size" << static_cast<int>(size)
  << "Data" << image
  << "Width" << width
  << "Height" << height
  << bsoncxx::builder::stream::finalize;
  return value;
}

DocumentBuilder::DocumentBuilder(const std::string& directory,
                                 const std::string& name)
  : directory_(directory),
    name_(name),
    unixtime_(0),
    ti_(0)
{
}

void DocumentBuilder::setTimeNow()
{
  time_t t(0);
  time(&t);
  setTime(t);
}

void DocumentBuilder::addBlock(const std::string& name,
                               const bsoncxx::document::value& contents)
{
  blocks_.push_back(std::make_pair(name, contents));
}

void DocumentBuilder::addBlock(const std::string& name,
                               bsoncxx::document::value&& contents)
{
  blocks_.push_back(std::make_pair(name, contents));
}

bsoncxx::document::value DocumentBuilder::generate()
{
  using bsoncxx::builder::stream::open_array;
  using bsoncxx::builder::stream::close_array;
  using bsoncxx::builder::stream::open_document;
  using bsoncxx::builder::stream::close_document;
  
  bsoncxx::builder::stream::document builder{};
  builder << "Directory" << directory_
          << "Document" << name_
          << "TI" << ti_
          << "unixtime" << static_cast<int64_t>(unixtime_);
  auto builder_array_opened = builder << "Blocks" << open_array;
  for (auto& block: blocks_) {
    builder_array_opened << open_document
                         << "BlockName" << block.first
                         << "Contents" << block.second
                         << close_document;
  }
  auto builder_array_closed = builder_array_opened << close_array;

  bsoncxx::document::value doc
    = builder_array_closed << bsoncxx::builder::stream::finalize;
  return doc;
}

} /* namespace hsquicklook */
