/**
 * Created by vol on 2016/12/20.
 */
//封装数据库的常用操作
var mongoDB = require("mongodb").MongoClient;
var settings = require("../settings.js")
//连接数据库

function _connectDB(callback){
    var url = settings.dbUrl;

    mongoDB.connect(url,function(err,db){
        //console.log("连接成功啦！");
        callback(err,db);
    });
}

exports.insertOne = function(collectionName,json,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).insertOne(json,function(err,result){
            callback(err,result);
            db.close();
        });
    });
};

exports.find = function(collectionName,queryJson,callback){
    _connectDB(function(err,db){
       db.collection(collectionName).find(queryJson).toArray(function(err,docs){
           callback(err,docs);
           db.close();
       });
    })
};

exports.findByPage = function(collectionName,queryJson,pageSize,pageNum,callback){
    _connectDB(function(err,db){
        //console.log(pageSize + "," + pageNum);
        var skipNum = parseInt(pageSize*pageNum);
        db.collection(collectionName).find(queryJson).limit(pageSize).skip(skipNum).toArray(function(err,docs){
            //console.log(skipNum + "," + pageSize)
            callback(err,docs);
            db.close();
        });
    })
};

exports.updateDocs = function(collectionName,queryJson,modifyJson,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).updateMany(queryJson,{$set:modifyJson},function(err,result){
            callback(err,result);
            db.close();
        })
    });
};

exports.deleteDocs = function(collectionName,queryJson,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).deleteMany(queryJson,function(err,result){
            callback(err,result);
            db.close();
        });
    });
};

exports.getCount = function(collectionName,queryJson,callback){
    _connectDB(function(err,db){
        db.collection(collectionName).count(queryJson,function(err,result){
            callback(err,result);
        })
    });
};