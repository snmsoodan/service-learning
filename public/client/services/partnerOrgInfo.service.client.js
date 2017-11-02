(function() {
    angular.module("ServiceLearningApp")
        .factory("PartnerOrgInfoService", PartnerOrgInfoService);


    function PartnerOrgInfoService($http){

        var model = {
            addUserOrgInfo:addUserOrgInfo
        };

        return model;

        function addUserOrgInfo(info) {
            return $http.post("/api/userOrgInfo",info);
        }
    }
})();
