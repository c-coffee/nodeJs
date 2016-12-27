/**
 * Created by volcano on 2016/12/10.
 */
var http = require("http");
var server = http.createServer(function(req,res){

    for(var i=1; i>0; i++){
        console.log("test");
    }
    res.end("结束");
}).listen(3000,'127.0.0.1');