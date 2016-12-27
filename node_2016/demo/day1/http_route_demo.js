/**
 * Created by volcano on 2016/12/10.
 */
var http = require("http");
var server = http.createServer(function(req,res){
    var path = req.url;
    if(/^\/student\/\d{9}$/.test(path)){
        res.end("学员匹配成功！")
    }else if(/^\/teacher\/\d{6}$/.test(path)){
        res.end("教员匹配成功！")
    }
    res.end("未能匹配");
}).listen(3000,'127.0.0.1');