var mongoose = require ("mongoose");

module.exports = function () {

    var UserSchema = require("./user.schema.server.js")();
    var UserInfo =  mongoose.model("UserInfo", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUserName: findUserByUserName,
        findUserByCredentials: findUserByCredentials
    };

    return api;

    function findUserById(userId) {
        return UserInfo.findById({_id: userId});
    }

    function findUserByUserName(name) {
        return UserInfo.findOne({username: name});
    }

    function findUserByCredentials(username, password) {
        return UserInfo.findOne({username: username, password: password});
    }

    function createUser(newUser) {
        return UserInfo.create(newUser);
    }
};