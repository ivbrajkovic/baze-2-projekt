// Read settings
const conf = require("../config.json");
// Init library
const pgp = require("pg-promise")(/*options*/);

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

//var db = pgp("postgres://ivanbrajkovic:@localhost:5432/pivovara_test");
const db = pgp(conn);

module.exports = db;
