/**
 * Created by vol on 2016/12/9.
 */
var http = require("http");
var server = http.createServer(function(req,res){

    res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
    res.end("哈哈哈哈，这是第一个Node页面");
});
server.listen(3000,"127.0.0.1");