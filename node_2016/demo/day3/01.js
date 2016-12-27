/**
 * Created by volcano on 2016/12/15.
 */
var express = require("express");
var app = express();

app.use(function(req,res){
    res.send({user:'aaa'});
});

app.listen(80);