/**
 * Created by vol on 2016/12/27.
 */
var formidable = require("formidable");
var db = require("../model/db.js");

exports.doRegister = function(req,res){
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var userName = fields.userName;
        var password = fields.password;
        
        
    });
    //查询数据库中是否存在同名用户
    //保存新用户
}