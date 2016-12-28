/**
 * Created by vol on 2016/12/27.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js")

//静态页面
app.use(express.static("./public"));
//路由表

app.post('/doRegister',router.doRegister);

app.listen(3000);