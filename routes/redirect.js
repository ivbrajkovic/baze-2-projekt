/**
 * Module dependencies.
 */
// const debug = require("debug")("pivovara:redirect");
const config = require("../config.json");
const router = require("express")();
const logit = require("../log");

/* redirect all traffic to HTTPS */
router.use(function(req, res, next) {
  // If secure protocol continue
  // let { headers, url, host } = req;
  // console.log(headers);

  if (req.secure) {
    logit.warning(
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
    logit.warning(
      "REDIRECT: ",
      "Client redirected to https://127.0.0.1:" + config.ports.https
    );
  }
});

module.exports = router;
