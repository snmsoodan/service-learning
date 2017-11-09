(function() {
    angular.module("ServiceLearningApp")
        .factory("PartnerOrgInfoService", PartnerOrgInfoService);


    function PartnerOrgInfoService($http){

        var model = {
            addUserOrgInfo:addUserOrgInfo,
            getUserOrgId:getUserOrgId
        };

        return model;

        function addUserOrgInfo(info) {
            return  $http.post("/api/userOrgInfo",info);
        }

        function getUserOrgId(userId) {
            console.log('Method :: getUserOrgId :: userId '+userId);
            return $http.post("/api/getUserOrgId",userId);
        }
    }
})();
