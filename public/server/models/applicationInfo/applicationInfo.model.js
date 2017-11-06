var mongoose = require ("mongoose");

module.exports = function () {

    var ApplicationInfoSchema = require("./applicationInfo.schema.server.js")();
    var ApplicationInfo = mongoose.model("applicationInfo", ApplicationInfoSchema);

    var api = {
        getAllOrganizationIdApplicationSubmitted:getAllOrganizationIdApplicationSubmitted,
        getAllOrganizationIdApplicationInProgress:getAllOrganizationIdApplicationInProgress,

        getSpecificOrganizationSubmitted:getSpecificOrganizationSubmitted,
        getSpecificOrganizationInProgress:getSpecificOrganizationInProgress,

        getSpecificApplicationSubmitted:getSpecificApplicationSubmitted,
        getSpecificApplicationInProgress:getSpecificApplicationInProgress
    };

    return api;
    
    function getAllOrganizationIdApplicationSubmitted() {
        return ApplicationInfo.find({status:'Submitted'})
    }

    function getAllOrganizationIdApplicationInProgress() {
        return ApplicationInfo.find({status:'InProgress'})
    }

    function getSpecificOrganizationSubmitted(pid) {
        return ApplicationInfo.find({status:'Submitted',_id:pid})
    }

    function getSpecificOrganizationInProgress(pid) {
        return ApplicationInfo.find({status:'InProgress',_id:pid})
    }

    function getSpecificApplicationSubmitted(prid) {
        return ApplicationInfo.findById(prid);
    }

    function getSpecificApplicationInProgress(prid) {
        return ApplicationInfo.findById(prid);
    }

};