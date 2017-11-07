var mongoose = require ("mongoose");

module.exports = function () {

    var UserSchema = require("./user.schema.server.js")();
    var UserInfo =  mongoose.model("UserInfo", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUserName: findUserByUserName,
        findUserByCredentials: findUserByCredentials,
        fetchUser: fetchUser,
        updateUser: updateUser
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

    function fetchUser(status) {
        return UserInfo.find({status: status});
    }

    function updateUser(newUser) {
        return UserInfo.update({_id: newUser._id},{
            $set: {
                status: newUser.status
            }
        });
    }
};