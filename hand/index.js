"use strict";

const logit = require("../lib").log;

// Generic GET handler;
module.exports = {
  GET_OLD: function(url, app, handler) {
    app.get(url, (req, res) => {
      handler(/*req*/)
        .then(data => {
          res.render("all", {
            success: true,
            db_data: data
          });
        })
        .catch(error => {
          res.json({
            success: false,
            error: error.message || error
          });
        });
    });
  },
  GET: (res, view, handler) => {
    handler()
      .then(data => {
        logit.warn_2("DATA:", data);
        res.render(view, {
          success: true,
          db_data: data
        });
      })
      .catch(error => {
        logit.error("ERROR:", error);
        res.json({
          success: false,
          error: error.message || error
        });
      });
  }
};
