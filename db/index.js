"use strict";

// Read connection settings from config file:
const conf = require("../config.json");

// loading all repositories
const repos = require("./repos");

// Extends db object to include products repos
const initOptions = {
  extend(obj, dc) {
    obj.products = new repos.Products(obj, pgp);
  }
};

// Loading and initializing the library:
const pgp = require("pg-promise")(initOptions);

// Preparing the connection details:
const conn =
  conf.database.db +
  "://" +
  conf.database.user +
  ":@" +
  conf.database.host +
  ":" +
  conf.database.port +
  "/" +
  conf.database.initial;

// Creating a new database instance from the connection details:
const db = pgp(conn);

// Exporting the database object for shared use:
module.exports = db;
