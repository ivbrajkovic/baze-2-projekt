var express = require("express");
var router = express.Router();
const logit = require("../log");
const db = require("../db/db");

router.get("/", function(req, res, next) {
  console.log("log 1");
  // console.log({
  //   db_data: ["Ivan", "Brajković"]
  // });

  // let data = [
  //   { ime: "Ivan", prezime: "Brajković" },
  //   { ime: "Aleksej", prezime: "Brajković" },
  //   { ime: "Belma", prezime: "Brajković" }
  // ];

  // console.log(JSON.stringify(data));

  res.render("sql", {
    /* db_data: data */
  });
});

router.post("/", function(req, res, next) {
  console.log("log 2");

  // Log query to colsole
  logit.info(req.body.commandSql);

  db.any(req.body.commandSql)
    .then(function(data) {
      logit.warn_2("DATA:", data);
      // res.render("unos", { db_data: data });
      res.render("sql", { db_data: data });
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

  //res.render("sql", { ime: "Ivan", prezime: "Brajković" });
});

module.exports = router;
