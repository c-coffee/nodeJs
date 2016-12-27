/**
 * Created by vol on 2016/12/21.
 */
var express = require("express");
var app = express();
var db = require("./modle/db");
var formidable = require("formidable");
var ObjectId = require("mongodb").ObjectID;

global.pageSize = 5;

app.set("view engine","ejs");
app.use(express.static("./public"));

//获取页面数据信息
app.get("/page",function(req,res,next){
    var page = parseInt(req.query.pageNum);
    db.findByPage("messages",{},global.pageSize,page,function(err,result){
        res.json({"result":result});
        next();
        //console.log(result);
    })
});

app.get("/deleteDoc",function(req,res,next){
    var id = req.query.id;
    db.deleteDocs("messages",{"_id":ObjectId(id)},function(err,data){
        if(err){
            res.json(-1);
        }else{
            res.json(1);
        }
    })
});

//获取页面总数（分页）
app.get("/getPageCount",function(req,res,next){
    global.pageSize = parseInt( req.query.pageSize );
    db.getCount("messages",{},function(err,result){
        var docCount = result;
        console.log(docCount + "," + global.pageSize);
        var pageCount = Math.ceil(docCount / global.pageSize);
        //console.log(docCount + "," + pageCount);
        var pages = [];
        for(var i=0;i<pageCount;i++){
            pages.push(i);
        }
        console.log(pages);
        console.log(pageCount);
        res.json({"pages":pages,"pageCount":pageCount-1});
        next();
    });
});

app.get("/",function(req,res,next){
    res.render("index");
});

//保存留言信息至数据库
app.post("/doPost",function(req,res){
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        //console.log(fields);
        if(fields.txtUserName != "" && fields.txtMsg != ""){
            db.insertOne("messages",fields,function(err,result){
                if(err){
                    res.json(-1);
                }else{
                    res.json(1);
                }
            });
        }
    });
});

app.listen(3000);