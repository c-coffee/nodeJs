/**
 * Created by volcano on 2016/12/13.
 */
var ejs = require("ejs");
var http = require("http");
var fs = require("fs");

http.createServer(function(req,res){
    if(req.url=="/"){
        fs.readFile("./views/index.ejs",function(err,data){
            var template = data.toString();
            var dict = {"version":7};

            var html = ejs.render(template,dict);
            res.writeHead(200,{"content-type":"text/html;charset=utf8"});
            res.end(html);
        });
    }
}).listen(80,"127.0.0.1");