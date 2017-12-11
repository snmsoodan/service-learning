(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerListInProgressController",PartnerListInProgressController);


    function PartnerListInProgressController($rootScope,OrgInfoService,FormService) {
        var vm = this;
        vm.aid=$rootScope.currentUser._id
        vm.partners=[];

        function init(){
            FormService.getAllOrganizationIdApplicationInProgress()
                .then(
                    function (response) {
                        var organizationIds=[];
                        var userIds=[];
                        for(var a in response.data) {
                            if(!(organizationIds.indexOf(response.data[a].orgId)>-1))
                            {
                                organizationIds.push(response.data[a].orgId)
                            }
                        }
                        console.log(organizationIds)
                        for(var b in organizationIds) {
                            OrgInfoService.getOrgById(organizationIds[b])
                                .then(function (resposnse) {
                                    vm.partners.push(resposnse.data)
                                }, function (err) {
                                    console.log(err)
                                })
                        }
                    },
                    function (err) {
                        console.log(err)
                    }
                )

        }init();




    }
})();