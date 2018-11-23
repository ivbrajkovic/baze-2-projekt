"use strict";

// File sql.js

// Proper way to organize an sql provider:
//
// - have all sql files for Users in ./sql/users
// - have all sql files for Products in ./sql/products
// - have your sql provider module as ./sql/index.js

const QueryFile = require("pg-promise").QueryFile;
const path = require("path");

// Helper for linking to external query files:
function sql(file) {
  // generating full path
  const fullPath = path.join(__dirname, file);
  return new QueryFile(fullPath, { minify: true });
}

module.exports = {
  // external queries for Products:
  products: {
    all: sql("products/all.sql"),
    addSelect: sql("products/addSelect.sql")
    // add: sql("products/add.sql"),
    // quote: sql("products/quote.sql"),
    // search: sql("products/search.sql")
  }
};
