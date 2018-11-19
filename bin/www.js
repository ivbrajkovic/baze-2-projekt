#!/usr/bin/env node

/**
 * Module dependencies.
 */
const conf = require("../config.json");
const app = require("../app");
const fs = require("fs");
const http = require("http");
const https = require("https");
const debugHttp = require("debug")("vinoteka:serverHttp");
const debugHttps = require("debug")("vinoteka:serverHttps");

/**
 * HTTP listen on provided port, on all network interfaces.
 */
http
  .createServer(app)
  .on("error", onError)
  .listen(conf.ports.http, () => {
    debugHttp("Server started at http://127.0.0.1:" + conf.ports.http);
  });

/**
 * HTTPS needed key and certificate
 */
const options = {
  key: fs.readFileSync(conf.ssl.key),
  cert: fs.readFileSync(conf.ssl.cert),
  ca: fs.readFileSync(conf.ssl.ca)
};

/**
 * HTTPS listen on provided port, on all network interfaces.
 */
const serverHttps = https.createServer(options, app);
serverHttps.on("error", onError).listen(conf.ports.https, () => {
  debugHttps("Server started at https://127.0.0.1:" + conf.ports.https);
});

/**
 * Start socket server over ssl
 */
require("../socket")(serverHttps);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  // Get server port
  let port = arguments[0].port;

  // Handle specific listen errors with friendly messages
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
