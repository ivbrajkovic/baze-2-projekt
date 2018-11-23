const db = require("../../db");
const logit = require("../../lib").log;
const router = require("express").Router();

router.get("/", function(req, res, next) {
  res.render("sql", {});
});

router.post("/", function(req, res, next) {
  // console.log("log 2");

  // Log query to colsole
  logit.info(req.body.commandSql);

  db.any(req.body.commandSql)
    .then(function(data) {
      logit.warn_2("DATA:", data);
      // res.render("unos", { db_data: data });
      res.render("web_console", { db_data: data });
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
