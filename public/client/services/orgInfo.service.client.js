(function() {
    angular.module("ServiceLearningApp")
        .factory("OrgInfoService", OrgInfoService);


    function OrgInfoService($http){

        var model = {
            addNewOrgInfo:addNewOrgInfo,
            getAllOrg:getAllOrg,
            getOrgById:getOrgById
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

    }
})();
