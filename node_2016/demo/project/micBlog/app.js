/**
 * Created by vol on 2016/12/27.
 */
var express = require("express");
var app = express();
var router = require("./router/router.js");
var session = require("express-session");

//静态页面
app.use(express.static("./public"));
app.use("/avatar",express.static("./avatar"));

app.set('trust proxy', 1); // trust first proxy
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

//路由表

app.post('/doRegister',router.doRegister); //用户注册
app.post('/doLogin',router.doLogin); //用户登录
app.post('/uploadPersonFile',router.uploadPseronFile);//上传用户头像
app.get('/checkLogin',router.checkLogin);  //检查是否登录
app.post('/cropPic',router.cropPic);  //剪切图片
app.post('/saveContent',router.saveContent); //保存用户说说
app.get('/showList',router.showList); //分页获取用户发表的内容
app.get('/getAvatar',router.getAvatar); //得到用户头像
app.listen(3000);