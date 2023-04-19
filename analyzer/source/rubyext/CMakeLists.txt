########################################################
set(TARGET_EXT_LIBRARY HSQuickLook)
set(EXT_LIB_INSTALL_DESTINATION ${CMAKE_INSTALL_PREFIX}/lib/ruby)
set(SWIG_IF_FILE ${TARGET_EXT_LIBRARY}.i)
set(CLASS_LIST_FILE class_list_${TARGET_EXT_LIBRARY}.hh)
set(RUBY_EXT_INCLUDE_DIRS
  ../include
  ${ANLNEXT_INC_DIR}
  ${Boost_INCLUDE_DIRS}
  ./interface
  )
set(RUBY_EXT_LIBRARY_DIRS
  /usr/local/lib
  ${ANLNEXT_LIB_DIR}
  ${ADD_LIB_DIR}
  )
set(RUBY_EXT_LIBRARIES
  HSQuickLookAnalyzer
  ${ANLNEXT_LIB}
  mongo::mongocxx_shared
  )

########################################################
set(cxx_definitions )
if(CS_USE_SIMX)
  list(APPEND cxx_definitions -DUSE_SIMX)
endif()
if(CS_USE_FITSIO)
  list(APPEND cxx_definitions -DUSE_FITSIO)
endif()

set(SWIG_FLAGS ${cxx_definitions})
add_definitions(${cxx_definitions})

########################################################
include(CreateSwigRuby)
