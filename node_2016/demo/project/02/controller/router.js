/**
 * Created by volcano on 2016/12/16.
 */
var file = require("../models/files.js");

exports.showIndex = function(req,res){
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            console.log(err);
            return;
        }
        //console.log(allAlbums);
        res.render("index",{albums:allAlbums});
    });

};

exports.showAlbum = function(req,res){
    var albumName = req.params.albumName;
    file.getImagesByAlbumName(albumName,function(err,allImages){
        if(err){
            console.log(err);
            return;
        }
        res.render("album",{
            "albumName":req.params.albumName,
            "allImages":allImages
        })
    });

};

exports.showErr = function(req,res){
    res.render("err");
};