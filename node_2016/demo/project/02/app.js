/**
 * Created by volcano on 2016/12/16.
 */
var express = require("express");
var app = express();
var router = require("./controller");

app.set("view engine","ejs");

app.use(express.static("./public"));
app.use(express.static("./uploads"));

app.get("/",router.showIndex);

app.get("/:albumName",router.showAlbum);

app.use(router.showErr);
app.listen(80);