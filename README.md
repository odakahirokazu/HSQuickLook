HSQuickLook
========================================

Multi-purpose web-based data monitoring system.

- Version: 1.4
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

This is local file access for test, so you may need to disable local file restriction (find it in Develop manu).
This client runs on an HTTP server for remote access.

Run an analyzer

    cd analyzer/run
    ./run_analyzer.rb

Have a fun on the web browser.

## Schema

## Frequently asked questions

## Information

### Contact

- Hirokazu Odaka 
- The University of Tokyo
- hirokazu.odaka(at)phys.s.u-tokyo.ac.jp

### GitHub

https://github.com/odakahirokazu/HSQuickLook/

### Supported Platform

#### For clients

- Web browsers supporting HTML5/WebSocket.

#### Test environment

The author's developing/testing environment is as follows:

- iMac
- macOS Monterey (12.6)
- Apple clang version 14.0.0 (clang-1400.0.29.102)
- Homebrew
- ruby 2.7.6
- Safari 16.0

### Contributions Are Welcome

Contributions of any kind including documentation, testing, and coding are very
welcome.

### Licence

HSQuickLook is distributed under xxx.

****************************************
