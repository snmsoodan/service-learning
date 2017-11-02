//we create a schema

module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level
    var ROLES =  ["Admin", "Partner", "Faculty"];

    var UserSchema = mongoose.Schema ({
        firstName : String,
        lastName : String,
        username : {type: String, required: true},
        password : String,
        role :  String,
        createdDate : {type: Date, default : Date.now}
    }, {collection: "UserInfo"});

    return UserSchema;
};