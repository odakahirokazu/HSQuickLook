HSQuickLook
========================================

Multi-purpose web-based data monitoring system.

- Version: 1.1
- Authors: Hirokazu Odaka and Soki Sakurai


## Introduction

HSQuickLook is a web-based data monitoring application.

HSQuickLook consists of four separate software, which are from the data root to user visualization:

1. data analyzer (pushes data documents to MongoDB)
2. MongoDB
3. WebSocket server (requests data documents and returns them to clients via WebSocket)
4. User visualization client running on a web browser

## Getting started

### Install

#### (1) MongoDB

It is easy to install MongoDB via Homebrew

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

MongoDB C++ client library is necessary:

    brew install mongo-cxx-driver

#### (2) data analyzer

HSQuickLook includes an example of a data analyzer. It uses ANL Next framework, is written in C++, and provides us with a Ruby interface.

Install ANL Next (which requires Boost, Ruby, SWIG).

Then, go to HSQuickLook/analyzer and make a build directory

    cd analyzer
    mkdir build

Execute cmake and make

    cmake ../source
    make
    make install

#### (3) WS server (hsquicklook_ws_server.rb)

This requires several packages

    gem install mongo
    gem install eventmachine
    gem install em-websocket
    gen install bson_ext
    gem install mime-types

### How to run

Run MongoDB.

    brew services start mongodb-community

Run WS server.

    cd ws_server
    ./hsquicklook_ws_server.rb

Open a client with Safari (or any other web browser you like).

    open clients/hsquicklook/index.html

You may need to disable cross-origin restriction (find it in Develop manu)

Run an analyzer

    cd analyzer/run
    ./run_analyzer.rb

Have a fun on the web browser.

## Schema

## Frequently asked questions

## Information

### Contact

- Hirokazu Odaka 
- ISAS/JAXA
- odaka(AT)astro.isas.jaxa.jp

### GitHub

https://github.com/odakahirokazu/HSQuickLook/

### Supported Platform

#### For clients

- Web browsers supporting HTML5/WebSocket.

#### Test environment

The author's developing/testing environment is as follows:

- MacBook Pro
- OS X Mavericks (10.10.1)
- Apple LLVM version 6.0 (clang-600.0.56) (based on LLVM 3.5svn)
- Homebrew
- ruby 2.1.5p273 (2014-11-13 revision 48405)
- Safari 8.0.2

We also test on Firefox and Google Chrome.

### Contributions Are Welcome

Contributions of any kind including documentation, testing, and coding are very
welcome.

### Licence

HSQuickLook is distributed under xxx.

****************************************
