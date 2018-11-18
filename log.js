// Load libraries
const moment = require("moment");
require("colors");

/**
 * Log information message to console
 * @param text message
 */
exports.info = function(msg, ...other) {
  //util.log(util.format("Log %s: %s", type, msg).green);
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.green, other);
};

/**
 * Log warn message to console
 * @param text message
 */
exports.warn = function(msg, ...other) {
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.yellow, other);
};

exports.warn_2 = function(msg, ...other) {
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.magenta, other);
};

/**
 * Log error message to console
 * @param text message
 */
exports.error = function(msg, ...other) {
  console.log(moment().format("Do MMM, HH:mm:ss - ") + msg.red, other);
};
