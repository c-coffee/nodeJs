/**
 * Created by vol on 2016/12/27.
 */
var formidable = require("formidable");
var db = require("../model/db.js");
var md5 = require("../model/md5.js");
var path = require("path");
var fs = require("fs");
var gm = require("gm");
var settings = require("../settings.js");

//注册模块
exports.doRegister = function(req,res){
    //得到用户填写的东西
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        var userName = fields.userName;
        //console.log(fields.userPwd);
        var password = md5( md5(fields.userPwd) + 'volcano' );
        //查询数据库中是否存在同名用户
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
            //保存新用户
            db.insertOne("users",{
                "userName":userName,
                "password":password,
                "avatar":"default.jpg"
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
                res.json({"result":"-3"}); //服务器错误
                return;
            }
            if(result.length == 0 ){
                res.send({"result":"-1"}); //用户名密码错误。
                return;
            }
            req.session.login = "1";
            req.session.userName = userName;

            res.json({"result":"1","userName":userName,"avatar":result[0].avatar}); //登录成功
        })
    });
};
//个人图像上传
exports.uploadPseronFile = function(req,res){
    var form = new formidable.IncomingForm();
    //设置上传图片默认路径
    form.uploadDir = path.normalize( __dirname + "/../avatar");
    //console.log(form.uploadDir);
    form.parse(req,function(err,fields,files){
        if(err){
            res.json({"status":"-1"});
        }
        var extraName = path.extname(files.file.name);
        //将上传文件改名（加入原始后缀名），采用同步方法完成
        fs.renameSync(files.file.path,files.file.path + extraName);
        var fileName = path.basename(files.file.path) + extraName;
        var filePath = "/avatar/" + fileName;
        //console.log(filePath);
        //todo 文件上传成功，则写入数据库

        //切记配置环境变量和重启webStrom
        gm(form.uploadDir + "\\" + fileName).size(function(err,size){
            if(err){
                console.log(err)
            }else{
                res.json({
                    "status":"1",
                    "filePath":filePath,
                    "width":size.width,
                    "height":size.height
                });
            }
        });

    });
};
//检查是否为登录用户
exports.checkLogin = function(req,res){
    if(req.session.login == "1"){
        res.json({"status":"1","userName":req.session.userName});
    }else{
        res.json({"status":"-1"});
    }
};
//剪切图片
exports.cropPic = function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        //console.log(fields);
        var cropInfo = fields.cropInfo;
        var picPath = path.normalize( __dirname + "/../" + fields.filePath);
        var fileName = path.basename(fields.filePath);
        console.log(fileName);
        //console.log(picPath);
        //console.log(path.normalize( __dirname + "\\..\\" + fields.filePath));
        console.log(cropInfo);
        gm(picPath)
            .crop(cropInfo.w,cropInfo.h,cropInfo.x,cropInfo.y)
            .resize(400, 400, '!')
            .write(picPath,function(err){
                if(err){
                    console.log(err);
                    res.json({r:"-1"});  //图片剪裁失败  //还应该要删除图片，重置数据库信息 ....
                    return;
                }
                db.updateDocs("users",{"userName":req.session.userName},{"avatar":fileName},function(err,result){
                    if(!err){
                        res.json({r:"1",avatar:fileName}); // 图片剪裁成功
                    }
                    else{
                        res.json({r:"-2"}); //数据库保存错误
                    }
                })

            });
    });
};
//存储用户发表的说说
exports.saveContent = function(req,res){
    //todo 验证用户是否登录，保存用户输入的内容
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            res.json({"result":-2}); //服务器错误
            return;
        }
        if(!req.session.login){
            res.json({"result":-1}); //用户尚未登录
            return;
        }
        db.insertOne("blog",{
            userName:req.session.userName,
            content:fields.content,
            datetime:new Date()
        },function(){
            res.json({"result":1}); //发布成功
        });
    });
};
//获取用户发表的信息
exports.showList = function(req,res){
    var userName = req.query.userName;
    var pageNum = req.query.pageNum;
    var queryObj = userName ? {"username":userName} : {};
    db.findByPage("blog",queryObj,settings.shuoshuo_pageSize,pageNum,function(err,result){
        if(err){
            res.json({r:-1,err:err});
        }else{
            res.json({r:1,result:result});
        }
    })
};
//获取用户头像
exports.getAvatar = function(req,res){
    var userName = req.query.userName;
    db.find("users",{"username":userName},function(err,result){
        if(!err){
            res.json({"avatar":result[0].avatar});
        }
    })
};