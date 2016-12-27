/**
 * Created by vol on 2016/12/27.
 */
var express = require("express");
var app = express();

app.use(express.static("./public"));

app.listen(3000);

