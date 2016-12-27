/**
 * Created by vol on 2016/12/20.
 */
var express = require("express");
var app = express();
var db = require("./modle/db.js");

app.get("/insert",function(req,res){
    db.insertOne("teacher",{"name":"老张"},function(err,result){
        if(err){
            console.log("插入失败!");
            return;
        }
        res.send("插入成功！" + result);
    });
});

app.get("/query",function(req,res){
    db.find("students",{},function(err,result){
        console.log(result)
        res.send(result);
    });
});

app.get("/page",function(req,res){
    var page = req.query.page;
    console.log(page);
    db.findByPage("students",{},3,page,function(err,result){
        res.send(result);
    })
});

app.get("/modify",function(req,res){
    var queryjson = {"name":"小强"};
    var modifyJson = {"age":50};
    db.updateDocs("students",queryjson,modifyJson,function(err,result){
        res.send(result);
    })
});

app.get("/delete",function(req,res){
    db.deleteDocs("students",{"name":"小雨"},function(err,result){
        res.send(result);
    });
});
app.listen(3000);