/**
 * Created by volcano on 2016/12/17.
 */
var fs = require("fs");

exports.getAllAlbums = function(callback){
    fs.readdir("./uploads",function(err,files){
        if(err){
            callback("没找到uploads文件夹",null);
            return;
        }
        var albums = [];
        if(files.length==0){
            callback(null,albums);
            return;
        }
        //console.log(files);

        (function iterator(i){
            if(i== files.length){
                callback(null,albums);
                return;
            }
            fs.stat("./uploads/" + files[i],function(err,stats){
                if(err){
                    callback("找不到文件" + files[i],null);
                }
                if(stats.isDirectory()){
                    albums.push(files[i])
                }
                iterator(i+1);
            });
        })(0);
    })
};

exports.getImagesByAlbumName = function(albumName,callback){
    fs.readdir("./uploads/" + albumName,function(err,files){
        if(err){
            callback(err,null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i==files.length){
                callback(null,allImages);
                return;
            }
            fs.stat("./uploads/"+albumName + "/" + files[i],function(err,stats){
                if(err){
                    callback(err,null);
                    return;
                }
                if(stats.isFile()){
                    allImages.push(files[i]);
                }
                iterator(i+1);
            })
        })(0);
    });

};