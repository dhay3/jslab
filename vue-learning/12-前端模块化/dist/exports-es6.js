"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// const sum = function (a, b) {
//   return parseInt(a) + parseInt(b);
// }
// const subtract = function (a, b) {
//   return parseInt(a) - parseInt(b);
// }
//
// export {
//   sum,
//   subtract
// }

//es6 另外一种方式导出模块
exports.default = {
  sum: function sum(a, b) {
    return parseInt(a) + parseInt(b);
  },
  subtract: function subtract(a, b) {
    return parseInt(a) - parseInt(b);
  }
};