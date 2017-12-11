(function() {
    angular.module("ServiceLearningApp")
        .factory("ApplicationInfoService", ApplicationInfoService);


    function ApplicationInfoService($http){

        var model = {
            // getAllOrganizationIdApplicationSubmitted:getAllOrganizationIdApplicationSubmitted,
            // getAllOrganizationIdApplicationInProgress:getAllOrganizationIdApplicationInProgress,

            // getSpecificOrganizationSubmitted:getSpecificOrganizationSubmitted,
            // getSpecificOrganizationInProgress:getSpecificOrganizationInProgress,

            getSpecificApplicationSubmitted:getSpecificApplicationSubmitted,
            getSpecificApplicationInProgress:getSpecificApplicationInProgress
        };

        return model;

        // function getAllOrganizationIdApplicationSubmitted() {
        //     return $http.get("/api/application/organizationNames/applicationSubmitted");
        // }

        // function getAllOrganizationIdApplicationInProgress() {
        //     return $http.get("/api/application/organizationNames/applicationInProgress");
        // }

        // function getSpecificOrganizationSubmitted(pid) {
        //     return $http.get("/api/applpication/applicationNames/applicationSubmitted/"+pid);
        // }

        // function getSpecificOrganizationInProgress(pid) {
        //     return $http.get("/api/applpication/applicationNames/applicationInProgress/"+pid);
        // }

        function getSpecificApplicationSubmitted(prid) {
            return $http.get("/api/applpication/applicationDetail/applicationSubmitted/"+prid);
        }

        function getSpecificApplicationInProgress(prid) {
            return $http.get("/api/applpication/applicationDetail/applicationInProgress/"+prid);
        }

    }
})();
