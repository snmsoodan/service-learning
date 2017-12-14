(function() {
    angular.module("ServiceLearningApp")
        .factory("PartnerOrgInfoService", PartnerOrgInfoService);


    function PartnerOrgInfoService($http){

        var model = {
            addUserOrgInfo:addUserOrgInfo,
            getUserOrgId:getUserOrgId,
            getPartnerId:getPartnerId,
            updateOrgUserInfo:updateOrgUserInfo,
            getAllOrgUserInfo:getAllOrgUserInfo
        };

        return model;

        function addUserOrgInfo(info) {
            return  $http.post("/api/userOrgInfo",info);
        }

        function getUserOrgId(userId) {
            console.log('Method :: getUserOrgId :: userId '+userId);
            return $http.post("/api/getUserOrgId",userId);
        }
        
        function getPartnerId(userId) {
            return $http.get("/api/getOrgId/"+userId);
        }

        function updateOrgUserInfo(userId) {
            console.log('Method :: updateOrgUserInfo :: userId '+userId);
            return $http.post("/api/updateOrgUserInfo",userId);
        }

        function getAllOrgUserInfo(userId) {
            console.log('Method :: updateOrgUserInfo :: userId '+userId);
            return $http.post("/api/getAllOrgUserInfo",userId);
        }

    }
})();
