/**
 * Created by volcano on 2016/12/11.
 */
var http = require('http');
http.createServer(function(req,res){
    test();
    res.end("成功!!!!!!!");
}).listen(80,'127.0.0.1');

function test(){
    var a = 4;
    var b = 4;
    var c = 4;
    var d = 4;

    op= ["+","-","*","/"];
    str = "";
    for(var i=0;i<4;i++){
        for( var j=0;j<4;j++){
            for(var m=0;m<4;m++){
                str = a + op[i] + b + op[j] + c + op[m] + d;
                console.log(str + "=" + eval(str));
                if(eval(str)==6){
                    console.log(str);
                }
            }
        }

    }
}