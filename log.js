const moment = require("moment");
require("colors");

/**
 * Log information message to console
 * @param text message
 */
exports.info = function(msg) {
  //util.log(util.format("Log %s: %s", type, msg).green);
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.green);
};

/**
 * Log warning message to console
 * @param text message
 */
exports.warning = function(msg) {
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.yellow);
};

/**
 * Log error message to console
 * @param text message
 */
exports.error = function(msg) {
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.red);
};
