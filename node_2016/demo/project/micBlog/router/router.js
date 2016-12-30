/**
 * Created by vol on 2016/12/27.
 */
var formidable = require("formidable");
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
var path = require("path");
var fs = require("fs");
//注册模块
exports.doRegister = function(req,res){
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var userName = fields.userName;
        //console.log(fields.userPwd);
        var password = md5( md5(fields.userPwd) + 'volcano' );
        db.find("users",{"userName":userName},function(err,result){
            if(err){
                console.log(err);
                res.send("-3"); //服务器错误
                return;
            }
            if(result.length > 0 ){
                res.send("-1"); //用户名已经存在。
                return;
            }
            //没用重名用户，可以存入
            db.insertOne("users",{
                "userName":userName,
                "pasword":password
            },function(err,result){
                if(err){
                    console.log(err);
                    res.send("-2");     //数据库错误
                }
                req.session.login = "1";
                req.session.userName = userName;
                res.send("1");
            });
        });
    });
    //查询数据库中是否存在同名用户
    //保存新用户
};
//登陆模块
exports.doLogin = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var userName = fields.userName;
        var password = md5( md5(fields.userPwd) + 'volcano' );
        //console.log(password);
        db.find("users",{"userName":userName,"password":password},function(err,result){
            if(err){
                console.log("login" + err);
                res.send("-3"); //服务器错误
                return;
            }
            if(result.length == 0 ){
                res.send("-1"); //用户名密码错误。
                return;
            }
            req.session.login = "1";
            req.session.userName = userName;

            res.send("1"); //登录成功
        })
    });
};
//个人图像上传
exports.uploadPseronFile = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize( __dirname + "/../avatar");
    console.log(form.uploadDir);
    form.parse(req,function(err,fields,files){
        //console.log(files.file);
        //console.log(fields);
        if(err){
            res.json({"status":"-1"});
        }
        var extraName = path.extname(files.file.name);
        fs.renameSync(files.file.path,files.file.path + extraName);
        var filePath = "/avatar/" + path.basename(files.file.path) + extraName;

        //console.log(filePath);
        //文件上传成功，则写入数据库，
        res.json({"status":"1","filePath":filePath});
    });
};