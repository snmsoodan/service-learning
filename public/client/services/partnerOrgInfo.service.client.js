(function() {
    angular.module("ServiceLearningApp")
        .factory("PartnerOrgInfoService", PartnerOrgInfoService);


    function PartnerOrgInfoService($http){

        var model = {
            addUserOrgInfo:addUserOrgInfo
        };

        return model;

        function addUserOrgInfo(info) {
            console.log("client service userorginfo");
            return $http.post("/api/userOrgInfo",info);
        }
    }
})();
