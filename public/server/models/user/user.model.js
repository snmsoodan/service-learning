var mongoose = require ("mongoose");

module.exports = function () {

    var UserSchema = require("./user.schema.server.js")();
    var UserInfo =  mongoose.model("UserInfo", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByEmailId: findUserByEmailId,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserById(userId) {
        return UserInfo.findById({_id: userId});
    }

    function findUserByEmailId(email) {
        return UserInfo.findOne({emailId: email});
    }


    //findOne returns only One (first one for multiple results)
    function findUserByCredentials(username, password) {
        return UserInfo.findOne({username: username, password: password});
    }

    function createUser(newUser) {
        var res = user.create(newUser);
        console.log("reached model",res);
        return res;
    }
};