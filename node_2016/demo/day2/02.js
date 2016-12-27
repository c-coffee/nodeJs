/**
 * Created by volcano on 2016/12/11.
 */
var http = require('http');
http.createServer(function(req,res){
    if(req.url=="/"){
        res.writeHead(200,{"content-type":"text/html;charset=utf8"});
        res.write("哈哈哈哈");
        res.end("成功!!!!!!!");
    }else{
        res.writeHead(404,{"content-type":"text/html;charset=utf8"});
        res.write("哈哈哈哈");
        res.end("失败!!!!!!!");
    }

}).listen(80,'127.0.0.1');