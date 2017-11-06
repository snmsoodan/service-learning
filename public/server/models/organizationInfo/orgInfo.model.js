var mongoose = require ("mongoose");

module.exports = function () {

    var OrgInfoSchema = require("./orgInfo.schema.server")();
    var OrgInfo = mongoose.model("OrgInfo", OrgInfoSchema);

    var api = {
        addOrgInfo: addOrgInfo,
        getAllOrg:getAllOrg,
        getOrgById:getOrgById
    };

    return api;

    function addOrgInfo(info) {
        return OrgInfo.create(info);
    }

    function getAllOrg(){
        console.log("model get all org");
        return OrgInfo.find();
    }

    function getOrgById(orgId) {
        return OrgInfo.findById(orgId);
    }
};