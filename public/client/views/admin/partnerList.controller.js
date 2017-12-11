(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerListController",PartnerListController);


    // var partners=[
    //     {_id: "123", name: "alice", applicationId:"1" },
    //     {_id: "234", name: "bob", applicationId:"2" },
    //     {_id: "345", name: "charly", applicationId:"3"  },
    //     {_id: "456", name: "jannunzi", applicationId:"4" }
    // ]


    function PartnerListController($rootScope,OrgInfoService,FormService,PartnerOrgInfoService) {
        var vm = this;
        vm.aid=$rootScope.currentUser._id
        vm.partners=[];

        function init(){
            FormService.getAllOrganizationIdApplicationSubmitted()
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