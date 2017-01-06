/**
 * Created by vol on 2017/1/6.
 */

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/bookStore");
var db = mongoose.connection;

db.once('open',function(){
    console.log("数据库连接成功！");
    return;
});

module.exports = db;