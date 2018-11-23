"use strict";

const sql = require("../sql").products;

class ProductsRepository {
  constructor(db, pgp) {
    this.db = db;
    this.pgp = pgp;
  }

  // Creates the table;
  // create() {
  //   return this.db.none(sql.create);
  // }

  // // Drops the table;
  // drop() {
  //   return this.db.none(sql.drop);
  // }

  // // Removes all records from the table;
  // empty() {
  //   return this.db.none(sql.empty);
  // }

  // Returns all product records;
  all() {
    return this.db.any(sql.all);
  }

  // Prepare add view
  addSelect() {
    return this.db.any(sql.addSelect);
  }
  // Adds a new record and returns the full object
  add(values) {
    return this.db.one(sql.add, {
      userId: +values.userId,
      productName: values.name
    });
  }

  // // Tries to delete a product by id, and returns the number of records deleted;
  // remove(id) {
  //   return this.db.result(
  //     "DELETE FROM products WHERE id = $1",
  //     +id,
  //     r => r.rowCount
  //   );
  // }

  // Tries to find a user product from user id + product name;
  // find(values) {
  //   return this.db.oneOrNone(sql.find, {
  //     userId: +values.userId,
  //     productName: values.name
  //   });
  // }

  // // Returns the total number of products;
  // total() {
  //   return this.db.one("SELECT count(*) FROM products", [], a => +a.count);
  // }
}

module.exports = ProductsRepository;
