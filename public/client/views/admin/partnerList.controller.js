(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerListController",PartnerListController);

    var partners=[
        {_id: "123", name: "alice", applicationId:"1" },
        {_id: "234", name: "bob", applicationId:"2" },
        {_id: "345", name: "charly", applicationId:"3"  },
        {_id: "456", name: "jannunzi", applicationId:"4" }
    ]

    function PartnerListController($rootScope,$location,$routeParams,$scope,$http,OrgInfoService,ApplicationInfoService) {
        var vm = this;
        vm.aid = $routeParams.aid;

        function init(){
            // vm.partners=partners;

            ApplicationInfoService.getAllOrganizationIdApplicationSubmitted()
                .then(
                    function (response) {

                        var applicationData=response.data;
                        var organizationIds=[];
                        vm.partners=[];
                        for(var i in applicationData)
                        {
                            OrgInfoService.getAllPartnerNamesApplicationsSubmitted(applicationData[i].organizationId)
                                .then(
                                    function (response2) {
                                        var organizationName=response2.data;
                                        vm.partners.push(organizationName);
                                    }
                                )
                        }



                    }
                )




        }init();


    }
})();