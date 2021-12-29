//如果使用es6模块化无法直接引入模块, 需要通过babel转码
// import {sum,subtract} from "./exports-es6"

//default导入一个m对象,通过m调用exports出来的属性和方法
import m from "./exports-es6"

console.log(m.sum(1,2));
console.log(m.subtract(1,2));