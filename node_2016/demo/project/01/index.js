/**
 * Created by volcano on 2016/12/14.
 */
var http = require("http");
var fs = require("fs");
var ejs = require("ejs");
var qs = require("querystring")
var fs = require("fs");
var formidable = require("formidable");
var path = require("path");

http.createServer(function(req,res){
    //console.log(req.url);
    //console.log(path.extname(req.url));
    if(req.url=="/admin"){
       fs.readFile("./view/admin.ejs",function(err,data){
           if(err){
               throw err;
           }
           var temp = data.toString();
           var dict = [];
           fs.readdir("./album/",function(err,files){
              if(err){
                  throw err;
              }else{
                    for(var i=0;i<files.length;i++){
                        var stats = fs.statSync( __dirname + "/album/" + files[i]);
                        if(stats.isDirectory()){
                            dict.push(files[i]);
                        }
                    }
                  var html = ejs.render(temp,{folders:dict});
                  res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                  res.end(html);
              }
           });
       })
    }else if(req.url=="/css/bootstrap.css"){
        fs.readFile("./css/bootstrap.css",function(err,cssData){
            res.writeHead(200,{"content-type":"text/css;charset=utf8"});
            res.end(cssData);
        })
    }else if(req.url == "/createFolder" && req.method.toLowerCase()=="post"){
        var data = "";
        req.addListener("data",function(chunk){
            data += chunk;
        });
        req.addListener("end",function(){
            var obj = qs.parse(data);
            //console.log(obj);
            fs.mkdir("./album/" + obj.txtFolderName,function(err){
                if(err){
                    res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                    res.end("创建失败，该相册可能已存在！");
                }else{
                    res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                    res.end("创建成功！");
                }
            })
        })
    }else if(req.url == "/upLoadPic" && req.method.toLowerCase() == "post"){
        var form = formidable.IncomingForm();
        form.uploadDir = "./album/";
        form.parse(req,function(err,fields,files){
            if(err){
                throw err;
            }
            //移动文件到用户指定相册
            //console.log(files);
            var extName = path.extname(files.upPic.name);
            var baseName = path.basename(files.upPic.path);
            var oldPath = "./" + files.upPic.path;
            var newPath = "./album/" + fields.sltFolder + "/" + baseName + extName;
            fs.rename(oldPath,newPath,function(){
                res.end("上传数据成功！");
            });
        })
    }else if(req.url == "/album"){
        fs.readFile("./view/album.ejs",function(err,albumData){
            var dict = [];
            var temp = albumData.toString();
            fs.readdir("./album/",function(err,files){
                if(err){
                    throw err;
                }else{
                    for(var i=0;i<files.length;i++){
                        var stats = fs.statSync( __dirname + "/album/" + files[i]);
                        if(stats.isDirectory()){
                            dict.push(files[i]);
                        }
                    }
                    var html = ejs.render(temp,{albums:dict});
                    res.writeHead(200,{"content-type":"text/html;charset=utf8"});
                    res.end(html);
                }
            });
        })
    }else if(req.url.substr(0,7) == "/images" || path.extname(req.url)==".jpg" ||path.extname(req.url)==".png" ){
        var extName = path.extname(req.url);
        var imgPath = req.url;
        if(imgPath.substr(0,1) != "."){
            imgPath = "." + imgPath;
        }
        //console.log(imgPath);
        fs.readFile(imgPath,function(err,imgData){
            fs.readFile("./css/mime.json",function(err,mimeData){
                res.writeHead(200,{"content-type":JSON.parse(mimeData.toString())[extName]});
                res.end(imgData);
            })
        })
    }else if(path.dirname(req.url) == "/album"){
        fs.readFile("./view/images.ejs",function(err,imgData){
            var temp = imgData.toString();
            var albumName = path.basename(req.url);

            fs.readdir("." + req.url,function(err,files){
                //console.log(req.url);
                temp = ejs.render(temp,{"albumName":albumName,"albumFiles":files});
                //console.log(files);
                res.end(temp);
            })
        });
    }
}).listen(3000,"127.0.0.1");