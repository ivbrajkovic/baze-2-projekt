#!/usr/bin/env node

/**
 * Module dependencies.
 */
const config = require("../config.json");
const app = require("../app");
const fs = require("fs");
const http = require("http");
const https = require("https");
const debugHttp = require("debug")("pivovara:serverHttp");
const debugHttps = require("debug")("pivovara:serverHttps");

/**
 * HTTP listen on provided port, on all network interfaces.
 */
http
  .createServer(app)
  .on("error", onError)
  .listen(config.ports.http, function() {
    var addr = this.address();
    debugHttp(
      "Server started at http://127.0.0.1:" +
        // this.address().address +
        // ":" +
        this.address().port
    );
  });

/**
 * HTTPS needed key and certificate
 */
const options = {
  key: fs.readFileSync(config.sll.key),
  cert: fs.readFileSync(config.sll.cert)
};

/**
 * HTTPS listen on provided port, on all network interfaces.
 */
https
  .createServer(options, app)
  .on("error", onError)
  .listen(config.ports.https, function() {
    var addr = this.address();
    debugHttps(
      "Server started at https://127.0.0.1:" +
        // this.address().address +
        // ":" +
        this.address().port
    );
  });

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  // get server port
  var port = arguments[0].port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(port + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(port + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// /**
//  * Event listener for HTTP server "listening" event.
//  */
// function onListening() {
//   var addr = this.address();
//   var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
//   debugHttp("Listening on " + bind);
// }
