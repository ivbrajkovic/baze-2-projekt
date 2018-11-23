const db = require("../../db");
const logit = require("../../lib").log;
const router = require("express").Router();

/* GET root page. */
router.get("/", function(req, res, next) {
  db.any("SELECT * FROM boja")
    .then(function(data) {
      logit.warn_2("DATA:", data);
      // res.render("unos", { db_data: data });
      res.render("input", { title: "database", db_data: data });
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

module.exports = router;
