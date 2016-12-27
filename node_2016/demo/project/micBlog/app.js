/**
 * Created by vol on 2016/12/27.
 */
var express = require("express");
var app = express();

//静态页面
app.use(express.static("./public"));
//路由表

app.listen(3000);