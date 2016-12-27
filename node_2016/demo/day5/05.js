/**
 * Created by volcano on 2016/12/24.
 */
var express = require("express");
var app = express();
var session = require("express-session");

//app.set('trust proxy', 1) // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
    //cookie: { secure: true }
}));

app.get("/login",function(req,res){
    req.session.login = true;
    req.session.userName = "张三";
    res.send("您已成功登录！");
});

app.get("/",function(req,res){
    if(req.session.login){
        res.send("欢迎" + req.session.userName);
    }else{
        res.send("请先登录！");
    }
});

app.listen(80);