(function() {
    angular.module("ServiceLearningApp")
        .factory("OrganizationInfoService", OrganizationInfoService);


    function OrganizationInfoService($http){

        var model = {
            // addUserOrgInfo:addUserOrgInfo
            getAllPartnerNamesApplicationsSubmitted:getAllPartnerNamesApplicationsSubmitted,
            getAllPartnerNamesApplicationsInProgress:getAllPartnerNamesApplicationsInProgress,

            sendMail:sendMail
        };

        return model;

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
