var pgp = require("pg-promise")(/*options*/);
var db = pgp("postgres://ivanbrajkovic:@localhost:5432/pivovara_test");
var express = require("express");
var router = express.Router();
const logit = require("../log");

/* GET home page. */
router.get("/", function(req, res, next) {
  db.any("SELECT * from proizvod")
    .then(function(data) {
      logit.warning_2rs("DATA:", data);
      res.render("db", { title: "database", db_data: data });
    })
    .catch(function(error) {
      console.log("ERROR:", error);
    });
});

module.exports = router;
