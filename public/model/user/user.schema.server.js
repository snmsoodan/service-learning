//we create a schema

module.exports = function () {
  var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var UserSchema = mongoose.Schema ({
        username : {type: String, required: true},
        password : String,
        firstName : String,
        lastName : String,
        dob: Date,
        createdDate : {type: Date, default : Date.now} ,
        role : String,
        reason: String,
        updatedDate: Date
    }, {collection: "EmployeeInfo" });

    return UserSchema;
};