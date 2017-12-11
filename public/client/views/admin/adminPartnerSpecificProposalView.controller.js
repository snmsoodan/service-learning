(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminPartnerSpecificProposalViewController",AdminPartnerSpecificProposalViewController);

    function AdminPartnerSpecificProposalViewController($routeParams,OrgInfoService,FormService) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.pid = $routeParams.pid;
        vm.prid=$routeParams.prid;
        vm.pApplications=[];
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
                                    // console.log(vm.partners)
                                }, function (err) {
                                    console.log(err)
                                })
                        }
                    },
                    function (err) {
                        console.log(err)
                    }
                )

            // console.log(vm.pid)

            FormService.getSpecificOrganizationSubmitted(vm.pid)
                .then(
                    function (response) {
                        vm.pApplications=response.data;
                        // console.log(vm.pApplications)

                        for(var i in vm.pApplications)
                        {
                            if(vm.pApplications[i]._id==vm.prid)
                            {
                                vm.form=vm.pApplications[i];
                                console.log(vm.form)
                            }
                        }
                    }
                )


        }init();




    }
})();