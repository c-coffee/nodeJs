/**
 * Created by vol on 2016/12/27.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");
var session = require("express-session");

//静态页面
app.use(express.static("./public"));

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//路由表

app.post('/doRegister',router.doRegister);
app.post('/doLogin',router.doLogin);
app.listen(3000);