var http = require("http");
var fs = require('fs');
var server = http.createServer(function(req,res){
    fs.mkdir("./album",function(err){
        if(err){
         console.log(err);
        }else{
            console.log("创建成功!");
        }
    });
    res.end();
}).listen(3000,'127.0.0.1');