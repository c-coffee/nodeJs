/**
 * Created by vol on 2016/12/27.
 */
var formidable = require("formidable");
var db = require("../model/db.js");
var md5 = require("../model/md5.js");

exports.doRegister = function(req,res){
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var userName = fields.userName;
        console.log(fields.userPwd);
        var password = md5( md5(fields.userPwd) + 'volcano' );
        db.find("users",{"userName":userName},function(err,result){
            if(err){
                res.sendStatus(-3); //服务器错误
                return;
            }
            if(result.length > 0 ){
                res.sendStatus(-1); //用户名已经存在。
                return;
            }
            //没用重名用户，可以存入
            db.insertOne("users",{
                "userName":userName,
                "pasword":password
            },function(err,result){
                if(err){
                    console.log(err);
                    res.sendStatus(-2);     //数据库错误
                }
                res.sendStatus(1);
            });
        });
    });
    //查询数据库中是否存在同名用户
    //保存新用户
}