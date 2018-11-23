#!/usr/bin/env node

"use strict";

/**
 * Module dependencies.
 */
const app = require("../app");
const logit = require("../lib").log;
const conf = require("../config.json");
const fs = require("fs");
const http = require("http");
const https = require("https");
// const debugHttp = require("debug")("vinoteka:serverHttp");
// const debugHttps = require("debug")("vinoteka:serverHttps");

/**
 * HTTP server on connect redirect client to secure HTTPS
 */
http
  .createServer(function(req, res) {
    logit.warn(
      "REDIRECT: ",
      "Client redirect to https://127.0.0.1:" + conf.ports.https
    );
    res.writeHead(302, {
      Location:
        "https://" +
        req.headers["host"].split(":")[0] +
        ":" +
        conf.ports.https +
        req.url
    });
    res.end();
  })
  .on("error", onError)
  .listen(conf.ports.http, () => {
    // debugHttp("Server started at http://127.0.0.1:" + conf.ports.http);
    logit.info(
      "HTTP:",
      "Server started at http://127.0.0.1:" + conf.ports.http
    );
  });

/**
 * HTTPS needed key and certificates
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
  // debugHttps("Server started at https://127.0.0.1:" + conf.ports.https);
  logit.info_2(
    "HTTPS:",
    "Server started at https://127.0.0.1:" + conf.ports.https
  );
});

/**
 * Start socket server over ssl
 */
require("../lib").socket(serverHttps);

/**
 * Error handler
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
