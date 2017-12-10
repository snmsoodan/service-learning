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


    function PartnerListController($rootScope,$location,$routeParams,$scope,$http,OrgInfoService,ApplicationInfoService,FormService,PartnerOrgInfoService) {
        var vm = this;
        // vm.aid = $routeParams.aid;
        vm.aid=$rootScope.currentUser._id
        console.log("PartnerListController")

        vm.partners=[];

        // vm.partners=partners;

        function init(){

            // ApplicationInfoService.getAllOrganizationIdApplicationSubmitted()
            //     .then(
            //         function (response) {
            //             console.log(response)
            //
            //             var applicationData=response.data;
            //             var organizationIds=[];
            //
            //             for(var i in applicationData)
            //             {
            //                 OrgInfoService.getAllPartnerNamesApplicationsSubmitted(applicationData[i].organizationId)
            //                     .then(
            //                         function (response2) {
            //                             console.log(response2)
            //                             var organizationName=response2.data;
            //                             vm.partners.push(organizationName);
            //
            //                         }
            //                     )
            //             }
            //
            //
            //
            //         }
            //     )


            FormService.getAllOrganizationIdApplicationSubmitted()
                .then(
                    function (response) {
                        // console.log(response.data)

                        var applicationData=[];
                        var organizationIds=[];
                        var userIds=[];
                        for(var a in response.data) {
                            // userIds.push(response.data[a].userId)
                            if(!(userIds.indexOf(response.data[a].userId)>-1))
                            {
                                userIds.push(response.data[a].userId)
                            }
                        }



                        for(var i in userIds)
                        {
                            // console.log(userIds[i])
                            PartnerOrgInfoService.getPartnerId(userIds[i])
                                .then(
                                    function (response) {
                                        // console.log(response.data)
                                        organizationIds=response.data;

                                        for(var b in organizationIds) {
                                            // console.log(organizationIds[b])
                                            OrgInfoService.getOrgById(organizationIds[b].orgId)
                                                .then(function (resposnse) {
                                                    // console.log(resposnse.data)
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


    }
})();