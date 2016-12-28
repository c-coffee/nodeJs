/**
 * Created by vol on 2016/12/28.
 */
var crypto = require("crypto");

module.exports = function(secret){
    var md5 = crypto.createHash("md5").update(secret).digest('hex');
    return md5;
}