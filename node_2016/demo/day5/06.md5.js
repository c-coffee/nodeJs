/**
 * Created by vol on 2016/12/26.
 */
var express = require("express");
var app = express();

app.set("view engine","ejs");

app.get("/",function(req,res){
    res.render("formTest");
});