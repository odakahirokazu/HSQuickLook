########################################################
include(ANLNextSwigRuby)

########################################################
set(cxx_definitions )
set(swig_flags )
if(CS_USE_SIMX)
  list(APPEND cxx_definitions USE_SIMX)
  list(APPEND swig_flags -DUSE_SIMX)
endif()
if(CS_USE_FITSIO)
  list(APPEND cxx_definitions USE_FITSIO)
  list(APPEND swig_flags -DUSE_FITSIO)
endif()

########################################################
anlnext_add_swig_ruby_binding(HSQuickLook
  INTERFACE_FILE HSQuickLook.i
  INSTALL_DESTINATION ${CMAKE_INSTALL_PREFIX}/lib/ruby
  INCLUDE_DIRECTORIES
    ${CMAKE_CURRENT_SOURCE_DIR}/../include
    ${ANLNEXT_INC_DIR}
    ${Boost_INCLUDE_DIRS}
  LIBRARIES
    HSQuickLookAnalyzer
    ${ANLNEXT_LIB}
    mongo::mongocxx_shared
  SWIG_FLAGS ${swig_flags}
  COMPILE_DEFINITIONS ${cxx_definitions}
)

target_link_directories(HSQuickLook PRIVATE
  /usr/local/lib
  ${ANLNEXT_LIB_DIR}
  ${ADD_LIB_DIR}
)
