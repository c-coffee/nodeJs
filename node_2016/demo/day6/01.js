/**
 * Created by vol on 2016/12/27.
 */
var fs = require('fs');
var gm = require('gm');

gm('./1.jpg')
    .crop(200,300,100,100)  //剪切 参数：宽，高，左上角X，左上角Y
    //.resize(90,50) //缩略
    .write('./1.png',function(err){
    if(!err) console.log('done');
});