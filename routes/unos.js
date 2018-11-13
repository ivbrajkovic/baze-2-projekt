var express = require("express");
var router = express.Router();
const logit = require("../log");
const db = require("../db");

/* GET home page. */
router.get("/", function(req, res, next) {
  db.any("SELECT * FROM boja")
    .then(function(data) {
      logit.warning_2("DATA:", data);
      // res.render("unos", { db_data: data });
      res.render("unos", { title: "database", db_data: data });
    })
    .catch(function(error) {
      logit.error("ERROR:", error);
      // set locals, only providing error in development
      res.locals.message = error.message;
      res.locals.error = req.app.get("env") === "development" ? error : {};

      // render the error page
      res.status(error.status || 500);
      res.render("error");
    });
});

// /* GET home page. */
// router.get("/", function(req, res, next) {
//   res.render("unos" /*, { title: "Express" }*/);
// });

module.exports = router;
