(function() {
    angular.module("ServiceLearningApp")
        .factory("OrgInfoService", OrgInfoService);


    function OrgInfoService($http){

        var model = {
            addNewOrgInfo:addNewOrgInfo,
            getAllOrg:getAllOrg,
            getOrgById:getOrgById,

            getAllPartnerNamesApplicationsSubmitted:getAllPartnerNamesApplicationsSubmitted,
            getAllPartnerNamesApplicationsInProgress:getAllPartnerNamesApplicationsInProgress,

            sendMail:sendMail
        };

        return model;

        function addNewOrgInfo(info) {
            console.log("client org reg"+info);
            return $http.post("/api/addOrgInfo",info);
        }

        function getAllOrg(){
            console.log("client get all org");
            return  $http.get("/api/getAllOrg");
        }

        function getOrgById(orgId){
            console.log("client get org by id"+orgId);
            return $http.get("/api/getOrg/" +orgId);

        }

        function getAllPartnerNamesApplicationsSubmitted(id) {
            return $http.get("/api/organization/organizationNames/applicationSubmitted/"+id);
        }

        function getAllPartnerNamesApplicationsInProgress(id) {
            return $http.get("/api/organization/organizationNames/applicationInProgress/"+id);
        }

        function sendMail() {
            return $http.get("/api/sendMail");
        }

    }
})();
