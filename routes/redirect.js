/**
 * Module dependencies.
 */
const config = require("../config.json");
const express = require("express");
const router = express.Router();
const log = require("../log");

/* redirect all traffic to HTTPS */
router.use(function(req, res, next) {
  log.info(
    "Client connect on: " +
      req.connection.remoteAddress +
      " port: " +
      req.connection.remotePort
  );
  if (req.secure) {
    next();
  } else {
    // redirect http listenning port to HTTPS istenning port
    res.redirect(
      "https://" +
        req.headers["host"].split(":")[0] +
        ":" +
        config.ports.https +
        req.url
    );
  }
});

module.exports = router;
