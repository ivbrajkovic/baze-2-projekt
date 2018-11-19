// Read connection settings from config file:
const conf = require("../config.json");

// Loading and initializing the library:
const pgp = require("pg-promise")(/*options*/);

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
