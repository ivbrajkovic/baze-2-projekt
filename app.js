// Load libraries
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const path = require("path");

// Load rootes
const redirectToHttps = require("./routes/redirect");
const sqlRouter = require("./routes/sql");
const indexRouter = require("./routes/index");
const unosRouter = require("./routes/unos");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Redirect to https
app.use(redirectToHttps);

// Serve all public folder
app.use(express.static(path.join(__dirname, "public")));

// Server routes
app.use("/", indexRouter);
app.use("/unos", unosRouter);
app.use("/sql", sqlRouter);

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
