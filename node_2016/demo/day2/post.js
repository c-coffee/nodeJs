/**
 * Created by volcano on 2016/12/12.
 */
var http = require("http");
var querystring = require("querystring");
http.createServer(function(req,res){
    //如果
    if(req.url == "/doPost" && req.method.toLowerCase() == "post"){
        var data = "";
        req.addListener("data",function(chunk){
            data += chunk;
        });

        req.addListener("end",function(){
            console.log(data.toString());
            var postData = querystring.parse(data.toString());
            console.log(postData.txtName);
            console.log(postData.rdoSex);
            console.log(postData.hobby);
            res.end("success");
        });
    }
}).listen(80,"127.0.0.1");