var mongoose = require ("mongoose");

module.exports = function () {

    var OrganizationInfoSchema = require("./organizationInfo.schema.server.js")();
    var OrganizationInfo = mongoose.model("OrganizationInfo", OrganizationInfoSchema);

    var api = {
        getAllPartnerNamesApplicationsSubmitted:getAllPartnerNamesApplicationsSubmitted,
        getAllPartnerNamesApplicationsInProgress:getAllPartnerNamesApplicationsInProgress
    };

    return api;

    function getAllPartnerNamesApplicationsSubmitted(id) {
        return OrganizationInfo.findById(id);
    }

    function getAllPartnerNamesApplicationsInProgress(id) {
        return OrganizationInfo.findById(id);
    }


};