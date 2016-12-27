/**
 * Created by volcano on 2016/12/10.
 */
var http = require("http");
var fs = require('fs');
var url = require('url');
var path = require('path');

http.createServer(function(req,res){
    var pathName = url.parse(req.url).pathname;
    var ext = path.extname(pathName);
    fs.readFile('./static/' + pathName,function(err,data){
        if(err){
            fs.readFile('./static/404.html',function(err,data){
                res.writeHead(404,{'Content-type':'text/html;charset=utf8'});
                res.end(data);
            })
        }else{
            var fileTypes = {};
            fs.readFile('./template/mime.json',function(err,mimedata){
                if(err){
                    console.log(err);
                }
                fileTypes = JSON.parse(mimedata);
                res.writeHead(200, {"Content-type": fileTypes[ext]});
                //console.log(fileTypes);
                // for(var extName in fileTypes){
                //     //console.log(extName);
                //     if(extName==ext){
                //         console.log(extName);
                //         //res.write("Content-type",fileTypes[extName]);
                //         res.writeHead(200, {"Content-type": fileTypes[extName]});
                //     }
                // }
                res.end(data);
            });
        }
    })

}).listen(80,'127.0.0.1');