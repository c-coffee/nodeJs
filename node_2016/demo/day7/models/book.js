/**
 * Created by vol on 2017/1/6.
 */
var mongoose = require("mongoose");
var db = require("./DB.js");

var bookSchema = mongoose.Schema({
    name:String,
    author:String,
    price:Number
});

var book = db.model('book',bookSchema);

var book1 = new book();
book1.name="文明之光";
book1.author = "吴军";
book1.price = 100;

book1.save(function(err,result){
    console.log(result);
    return;
});
