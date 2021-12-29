"use strict";

var _exportsEs = require("./exports-es6");

var _exportsEs2 = _interopRequireDefault(_exportsEs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_exportsEs2.default.sum(1, 2)); //如果使用es6模块化无法直接引入模块, 需要通过babel转码
// import {sum,subtract} from "./exports-es6"

//default导入一个m对象,通过m调用exports出来的属性和方法

console.log(_exportsEs2.default.subtract(1, 2));