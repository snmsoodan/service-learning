(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminPartnerSpecificController",AdminPartnerSpecificController);

    // var partners=[
    //     {_id: "123", name: "alice", applicationId:"1", a1:"First app 123"},
    //     {_id: "234", name: "bob", applicationId:"2" },
    //     {_id: "345", name: "charly", applicationId:"3" },
    //     {_id: "456", name: "jannunzi", applicationId:"4" }
    // ]

    var partnerApps=[
        {_id:"123" ,applicationId:"1", name:"First app 123" },
        {_id:"123" ,applicationId:"2", name:"Second app 123" },
        {_id:"123" ,applicationId:"3", name:"Third app 123" },
        {_id: "234",applicationId:"1", name:"First app 234" },
        {_id: "234",applicationId:"2", name:"Second app 234" }
    ]


    function AdminPartnerSpecificController($routeParams,OrgInfoService,FormService,PartnerOrgInfoService) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.pid = $routeParams.pid;
        vm.pApplications=[];
        vm.partners=[];

        function init(){
            FormService.getAllOrganizationIdApplicationSubmitted()
                .then(
                    function (response) {
                        var organizationIds=[];
                        var userIds=[];
                        for(var a in response.data) {
                            if(!(userIds.indexOf(response.data[a].userId)>-1))
                            {
                                userIds.push(response.data[a].userId)
                            }
                        }

                        for(var i in userIds)
                        {
                            PartnerOrgInfoService.getPartnerId(userIds[i])
                                .then(
                                    function (response) {
                                        organizationIds=response.data;
                                        for(var b in organizationIds) {
                                            OrgInfoService.getOrgById(organizationIds[b].orgId)
                                                .then(function (resposnse) {
                                                    vm.partners.push(resposnse.data)
                                                }, function (err) {
                                                    console.log(err)
                                                })
                                        }
                                    },function (err) {
                                        console.log(err)
                                    }
                                )



                        }
                    },
                    function (err) {
                        console.log(err)
                    }
                )




        }init();

        // function init(){
        //     // vm.partners=partners;
        //     ApplicationInfoService.getAllOrganizationIdApplicationSubmitted()
        //         .then(
        //             function (response) {
        //
        //                 var applicationData=response.data;
        //                 var organizationIds=[];
        //
        //                 for(var i in applicationData)
        //                 {
        //                     OrgInfoService.getAllPartnerNamesApplicationsSubmitted(applicationData[i].organizationId)
        //                         .then(
        //                             function (response2) {
        //                                 var organizationName=response2.data;
        //                                 vm.partners.push(organizationName);
        //                             }
        //                         )
        //                 }
        //
        //
        //
        //             }
        //         )
        //
        //     ApplicationInfoService.getSpecificOrganizationSubmitted(vm.pid)
        //         .then(
        //             function (response) {
        //                 vm.pApplications=response.data;
        //             }
        //         )
        //
        //
        //
        // }init();


    }
})();