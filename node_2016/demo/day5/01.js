/**
 * Created by vol on 2016/12/20.
 */
var express = require("express");
var app = express();
var mongoClient = require("mongodb").MongoClient;

app.get("/",function(req,res){
    var url = "mongodb://localhost:27017/test";
    mongoClient.connect(url,function(err,db){
        db.collection('students').insertOne({
            "name":"小雨",
            "age": parseInt(Math.random()*100 + 10)
        },function(err,result){
            if(err){
                console.log(err);
            }
            db.close();
            console.log(result);
            res.send(result);
        });
    });
});
app.listen(3000);
