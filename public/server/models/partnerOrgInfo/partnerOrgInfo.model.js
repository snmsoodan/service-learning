var mongoose = require ("mongoose");

module.exports = function () {

    var PartnerOrgInfoSchema = require("./partnerOrgInfo.schema.server.js")();
    var PartnerOrgInfo = mongoose.model("PartnerOrgInfo", PartnerOrgInfoSchema);

    var api = {
        addUserOrgInfo: addUserOrgInfo
    };

    return api;

    function addUserOrgInfo(info) {
        return PartnerOrgInfo.create(info);
    }
};