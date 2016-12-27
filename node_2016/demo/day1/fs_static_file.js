/**
 * Created by volcano on 2016/12/10.
 */
var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req,res){
    if(req.url == '/favicon.ico'){
        return;
    }
    fs.readdir('./template',function(err,files){
        var directories = [];
        /*
        方案1：采用同步函数 fs.statSync
        for(var i=0;i<files.length;i++){
            //fs.stat('./template/' + files[i],function(err,stats){
            var stats = fs.statSync('./template/' + files[i]);
            if(stats.isDirectory()){
                directories.push(files[i]);
            }
        }
        console.log(directories);*/

        // 方案二：利用递归方式实现同步
        (function iterator(i){
            if(i==files.length){
                console.log(directories);
                return;
            }
            fs.stat('./template/' + files[i],function(err,stats){
                if(stats.isDirectory()){
                    directories.push(files[i]);
                }
                iterator(i+1);
            });

        })(0);


    });
    res.end();
}).listen(3000,'127.0.0.1');