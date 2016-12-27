/**
 * Created by volcano on 2016/12/15.
 */
var express = require("express");
var app = express();

app.use(function(req,res,next) {
    console.log("In second route");
    next(); // go to next route.
});

// Error handling middle-ware

app.use(function(err,req,res,next) {
    console.log("Error happens",err.stack);
});
app.listen(80);