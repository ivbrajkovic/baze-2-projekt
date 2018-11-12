var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://ivanbrajkovic:@localhost:5432/pivovara_test");

db.any("SELECT * from proizvod")
  .then(function(data) {
    console.log("DATA:", data);
  })
  .catch(function(error) {
    console.log("ERROR:", error);
  });

module.exports = db;
