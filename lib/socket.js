"use strict";

/**
 * Db reference
 */
const logit = require("./log");
const db = require("../db");

/**
 * Setup socket server for real time update
 */
module.exports = function(serverHttps) {
  const io = require("socket.io")(serverHttps);

  var conn_count = 0;
  io.on("connection", function(socket) {
    ++conn_count;
    logit.warn("CLIENT:", `Client connected, id: ${socket.id}`);
    socket.emit("hello", { server: `hello client num: ${conn_count}` });
    socket.on("hello", function(data) {
      logit.info("HELLO:", data);
    });
    socket.on("command", function(sql) {
      logit.info("SQL:", sql.comm);
      db.any(sql.comm)
        .then(function(data) {
          logit.warn_2("DATA:", data);
          if (data == "") {
            data.push("ok");
            socket.emit("info", data);
          } else socket.emit("data", data);
        })
        .catch(function(error) {
          logit.error("ERROR:", error);
          socket.emit("info", error.message);
        });
    });
    socket.on("disconnect", function() {
      --conn_count;
      logit.warn("CLIENT:", `Client disconnected, id: ${socket.id}`);
    });
    socket.on("error", function() {
      --conn_count;
      logit.warn("CLIENT:", "Socket client error");
    });
  });
};
