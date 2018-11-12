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
  .listen(config.ports.http, () => {
    debugHttp("Server started at http://127.0.0.1:" + config.ports.http);
  });

/**
 * HTTPS needed key and certificate
 */
const options = {
  key: fs.readFileSync(config.ssl.key),
  cert: fs.readFileSync(config.ssl.cert),
  ca: fs.readFileSync(config.ssl.ca)
};

/**
 * HTTPS listen on provided port, on all network interfaces.
 */
https
  .createServer(options, app)
  .on("error", onError)
  .listen(config.ports.https, () => {
    debugHttps("Server started at https://127.0.0.1:" + config.ports.https);
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
