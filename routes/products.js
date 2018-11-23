"use strict";

const db = require("../db");
// const logit = require("../lib").log;
const router = require("express").Router();

// router.get("/", function(req, res, next) {
//   res.redirect("/products/all");
// });

// View all products
router.get("/all", function(req, res, next) {
  require("../hand").GET(res, "all", () => db.products.all());
});

// Add products
router.get("/add", function(req, res, next) {
  require("../hand").GET(res, "add", () => db.products.addSelect());
});

module.exports = router;
