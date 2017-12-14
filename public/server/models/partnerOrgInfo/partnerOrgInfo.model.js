var mongoose = require ("mongoose");

module.exports = function () {

    var PartnerOrgInfoSchema = require("./partnerOrgInfo.schema.server.js")();
    var PartnerOrgInfo = mongoose.model("PartnerOrgInfo", PartnerOrgInfoSchema);

    var api = {
        addUserOrgInfo: addUserOrgInfo,
        getUserOrgId:getUserOrgId,
        getPartnerId:getPartnerId,
        updateOrgUserInfo : updateOrgUserInfo,
        getAllOrgUserInfo : getAllOrgUserInfo
    };

    return api;


    function getPartnerId(userId) {
        return PartnerOrgInfo.find({"userId":userId})
    }

    function addUserOrgInfo(info) {
        return PartnerOrgInfo.create(info);
    }

    function getUserOrgId(id){
        return PartnerOrgInfo.findOne({userId:id});
    }

    function getAllOrgUserInfo(){
        return PartnerOrgInfo.find();
    }

    function updateOrgUserInfo(user){
        console.log('Method Model:: updateOrgUserInfo :: user id = '+user._id+' userId.orgId '+user.orgId);
        return PartnerOrgInfo.update({_id: user._id},{
            $set: {
                orgId: user.orgId,
                orgName:user.orgName
            }
        });
    }
};