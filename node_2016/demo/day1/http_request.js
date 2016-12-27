/**
 * Created by volcano on 2016/12/10.
 */
var http = require("http");
var url = require('url');
http.createServer(function(req,res){
    console.log("protocol:" + url.parse(req.url).protocol);
    console.log("pathname" + url.parse(req.url).pathname);
    console.log("query" + url.parse(req.url,true).query);
    console.log("hash" + url.parse(req.url).hash);
    console.log("queryObject" + url.parse(req.url,true).query);
    console.log("queryObject" + req.rawHeaders);
    res.end();
}).listen(3000,'127.0.0.1');