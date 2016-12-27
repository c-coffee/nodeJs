/**
 * Created by vol on 2016/12/13.
 */
var http = require("http");
var formidable = require("formidable");
var fs = require("fs");
var sdate = require("silly-datetime");
var path = require("path");

http.createServer(function(req,res){
    if(req.url == "/postData" && req.method.toLowerCase() == "post"){
        var form = new formidable.IncomingForm();
        form.uploadDir = './uploads';
        form.parse(req,function(err,fields,files){
            //当执行form.parse时，所有数据已经接收完毕，fields里面存放的是表单数据，files中存放传输文件
            if(err){
                console.log(err);
                throw err;
            }
            //执行改名
            var now = sdate.format(new Date(),'YYYYMMDDHHmmss');
            var rand = parseInt(Math.random()*8999 + 10000);
            var extName = path.extname(files.upFile.name);
            var oldPath = __dirname + "/" + files.upFile.path;
            var newPath = __dirname + "/uploads/" + now + rand + extName;
            fs.rename(oldPath,newPath,function(err){
                if(err){
                    throw err;
                }
                res.writeHead(200,{"content-type":"text/plain;charset=utf8"});
                
                //console.log(fields);
                //console.log(files);
                res.end("成功！");
            });
        });
    }
}).listen(3000,"127.0.0.1");