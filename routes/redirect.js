/**
 * Module dependencies.
 */
// const debug = require("debug")("vinoteka:redirect");
const config = require("../config.json");
const router = require("express")();
const logit = require("../log");

/* redirect all traffic to HTTPS */
router.use(function(req, res, next) {
  // If secure protocol continue
  // let { headers, url, host } = req;
  // console.log(headers);

  //console.log(req.query.transport);
  //if (req.query.transport != "polling") {
  if (req.secure) {
    logit.warn(
      "CONNECT: ",
      "Client connect from: " +
        req.connection.remoteAddress +
        " port: " +
        req.connection.remotePort
    );
    next();
    // redirect http listenning port to HTTPS istenning port
  } else {
    res.redirect(
      "https://" +
        req.headers["host"].split(":")[0] +
        ":" +
        config.ports.https +
        req.url
    );
    logit.warn(
      "REDIRECT: ",
      "Client redirected to https://127.0.0.1:" + config.ports.https
    );
  }
  //} else next();
});

module.exports = router;
