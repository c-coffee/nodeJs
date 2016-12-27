/**
 * Created by volcano on 2016/12/9.
 */
var http = require("http");
var fs = require("fs");
var server = http.createServer(function(req,res){
    if(req.url=="/yuan"){
        fs.readFile("./01.html",function(err,data){
            res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
            res.end(data);
        })
    }else if(req.url="/carousel_01.png") {
        fs.readFile("./carousel_01.png", function (err, data) {
            res.writeHead(200, {"Content-type": "image/png"});
            res.end(data);
        })
    }
});

server.listen(3000,"127.0.0.1");