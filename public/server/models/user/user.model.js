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
        updateUser: updateUser,
        updateUserPwd:updateUserPwd,
        deleteUser:deleteUser,
        fetchAll:fetchAll
    };

    return api;

    function findUserById(userId) {
        return UserInfo.findById(userId);
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

    function updateUserPwd(newUser) {
        //console.log('Model :: updateUserPwd :: newUser --'+newUser._id+'--password --'+newUser.password);
        return UserInfo.update({_id: newUser._id},{
            $set: {
                password: newUser.password
            }
        });
    }

    function fetchAll(status) {
        return UserInfo.find();
    }

    function deleteUser(newUser) {
        return UserInfo.remove({_id:newUser._id},function(success){
            //console.log('deleteUser :: newUser '+newUser+' :: success:: '+success);
            return success;
        } ,function(err){
            return err;
            if(err) throw err;
        });
    }
};