// 使用es6的语法模块化必须通过babel转码成es5

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
export default {
  sum(a, b) {
    return parseInt(a) + parseInt(b);
  },

  subtract(a, b) {
    return parseInt(a) - parseInt(b);
  }
}
