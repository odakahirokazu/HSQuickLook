cmake_minimum_required(VERSION 3.8)

### Initial definition of cmake variables
set(CMAKE_INSTALL_PREFIX $ENV{HOME} CACHE PATH "install prefix")
set(CMAKE_BUILD_TYPE Release CACHE STRING "build type")
set(CMAKE_CXX_FLAGS_DEBUG "-g -W -Wall" CACHE STRING "CXX_FLAGS for debug")
set(CMAKE_C_FLAGS_DEBUG "-g -W -Wall" CACHE STRING "C_FLAGS for debug")
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -W -Wall" CACHE STRING "CXX_FLAGS for release")
set(CMAKE_C_FLAGS_RELEASE "-O3 -W -Wall" CACHE STRING "C_FLAGS for release")
set(CMAKE_MACOSX_RPATH 1)

### Definition of project
project(DAQTest)
add_definitions("-std=c++11")
set(CMAKE_MODULE_PATH ${DAQTest_SOURCE_DIR}/cmake ${CMAKE_MODULE_PATH})

message("-- Install destination prefix: ${CMAKE_INSTALL_PREFIX}")
set(CMAKE_INSTALL_RPATH "${CMAKE_INSTALL_PREFIX}/lib")

set(MY_LIBRARY DAQTest)

### External libraries
### BOOST ###
find_package(Boost 1.60.0 REQUIRED COMPONENTS system filesystem)
message("-- Boost_INCLUDE_DIRS: ${Boost_INCLUDE_DIRS}")
message("-- Boost_LIBRARIES: ${Boost_LIBRARIES}")

### ANL ###
if(NOT DEFINED ANLNEXT_INSTALL)
  if(DEFINED ENV{ANLNEXT_INSTALL})
    set(ANLNEXT_INSTALL $ENV{ANLNEXT_INSTALL})
  else()
    set(ANLNEXT_INSTALL $ENV{HOME})
  endif()
endif(NOT DEFINED ANLNEXT_INSTALL)
set(ANLNEXT_INC_DIR ${ANLNEXT_INSTALL}/include)
set(ANLNEXT_LIB_DIR ${ANLNEXT_INSTALL}/lib)
set(ANLNEXT_LIB ANLNext)
set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} ${ANLNEXT_LIB_DIR}/anlnext)
message("-- ANLNEXT_INSTALL = ${ANLNEXT_INSTALL}")

### MongoDB ###
find_package(libmongocxx REQUIRED)
message("-- LIBMONGOCXX_INCLUDE_DIRS: ${LIBMONGOCXX_INCLUDE_DIRS}")
message("-- LIBMONGOCXX_LIBRARIES: ${LIBMONGOCXX_LIBRARIES}")

include_directories(
  include
  ${BOOST_INCLUDE_DIRS}
  ${ANLNEXT_INC_DIR}
  ${LIBMONGOCXX_INCLUDE_DIRS}
  )

link_directories(
  ${ANLNEXT_LIB_DIR}
  )

set(ANL_MODULES
  src/MongoDBClient.cc
  src/WaitFor.cc
  src/DAQ2.cc
  src/DAQ3.cc
  )

add_library(${MY_LIBRARY} SHARED
  ${ANL_MODULES}
)

target_link_libraries(${MY_LIBRARY}
  ${ANLNEXT_LIB}
  ${Boost_LIBRARIES}
  ${LIBMONGOCXX_LIBRARIES}
  )

install(TARGETS ${MY_LIBRARY} LIBRARY DESTINATION ${CMAKE_INSTALL_PREFIX}/lib)

add_subdirectory(rubyext)
