var mongoose = require ("mongoose");

module.exports = function () {

    var PartnerOrgInfoSchema = require("./partnerOrgInfo.schema.server.js")();
    var PartnerOrgInfo = mongoose.model("PartnerOrgInfo", PartnerOrgInfoSchema);

    var api = {
        addUserOrgInfo: addUserOrgInfo,
        getUserOrgId:getUserOrgId
    };

    return api;

    function addUserOrgInfo(info) {
        return PartnerOrgInfo.create(info);
    }

    function getUserOrgId(id){
        return PartnerOrgInfo.findOne({userId:id});
    }
};