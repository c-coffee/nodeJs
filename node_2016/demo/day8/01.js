/**
 * Created by volcano on 2017/1/8.
 */
var express = require("express");
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static("public"));

io.on('connection',function(socket){
    console.log("连接成功！");
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});


server.listen(3000);  //必须使用server.listen，而不能是app.listen。否则socket.io无法加载