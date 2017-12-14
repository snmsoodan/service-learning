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
        fetchAll:fetchAll,
        addOppInfo: addOppInfo,
        getAllOppInfo:getAllOppInfo,
        getAllReqOppInfo:getAllReqOppInfo,
        updateOppInfo:updateOppInfo,
        updateOppInfoApproved:updateOppInfoApproved
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


    function addOppInfo(newUser) {
        return UserInfo.update({_id: newUser._id},{$push: {"opportunities": newUser.opportunities}});
    }


    function getAllOppInfo(){
        console.log("model get all Req Opp");
        return UserInfo.find({ opportunities: { $exists: true, $ne: [] }});
    }

    function getAllReqOppInfo(){
        console.log("model get all Opp");
        return UserInfo.find();
    }

    function updateOppInfo(newUser) {
        console.log("model get all updateOppInfo"+newUser.adminId + "--ewUser._id--"+newUser._id+"newUser.status"+newUser.status);
        return UserInfo.update({_id : newUser.adminId , "opportunities._id" : newUser._id } ,
            {$set : {"opportunities.$.partnerId" : newUser.partnerId,"opportunities.$.status":newUser.status,
                "opportunities.$.requestedBy":newUser.partnerId,"opportunities.$.requestedDate":new Date(),
                "opportunities.$.partnerOrgId":newUser.partnerOrgId}});
    }


    function updateOppInfoApproved(newUser) {
        console.log("model get all updateOppInfo"+newUser.adminId + "--ewUser._id--"+newUser._id);
        return UserInfo.update({_id : newUser.adminId , "opportunities._id" : newUser._id } ,
            {$set : {"opportunities.$.approvedBy" : newUser.approvedBy,"opportunities.$.status":newUser.status,
                "opportunities.$.allocatedTo":newUser.allocatedTo,"opportunities.$.allocatedDate":new Date()}});
    }


};