/**
 * Created by volcano on 2016/12/11.
 */
var m1 = require("module1");
var People = require("people");
console.log(m1.msg);

var zhansan = new People.People("zs","man",18);
zhansan.sayHello();