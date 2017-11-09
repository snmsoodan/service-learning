var mongoose = require ("mongoose");

module.exports = function () {

    var OrgInfoSchema = require("./orgInfo.schema.server")();
    var OrgInfo = mongoose.model("OrgInfo", OrgInfoSchema);

    var api = {
        addOrgInfo: addOrgInfo,
        getAllOrg:getAllOrg,
        getOrgById:getOrgById,
        getAllPartnerNamesApplicationsSubmitted:getAllPartnerNamesApplicationsSubmitted,
        getAllPartnerNamesApplicationsInProgress:getAllPartnerNamesApplicationsInProgress,
        updateOrgById:updateOrgById
    };

    return api;

    function addOrgInfo(info) {
        return OrgInfo.create(info);
    }

    function getAllOrg(){
        console.log("model get all org");
        return OrgInfo.find({status:'Approved'});
    }

    function getOrgById(orgId) {
        return OrgInfo.findById(orgId);
    }


    function getAllPartnerNamesApplicationsSubmitted(id) {
        return OrgInfo.findById(id);
    }

    function getAllPartnerNamesApplicationsInProgress(id) {
        return OrgInfo.findById(id);
    }

    function updateOrgById(newUser) {
        return OrgInfo.update({_id: newUser._id},{
            $set: {
                status: newUser.status
            }
        });
    }

};