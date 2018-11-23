"use strict";

// Load libraries
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");
const db = require("./db");

// Load rootes
const indexRouter = require("./routes/index");
const productsRouter = require("./routes/products");

// Main application
const app = express();

// View engine setup
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Global middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Serve all public folder, needed for js and css files;
app.use(express.static(path.join(__dirname, "public")));

// Server routes
app.use("/", indexRouter);
// GET("/all", () => db.products.all());
// require("./hand").GET("/all", app, () => db.products.all());
app.use("/products", productsRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
