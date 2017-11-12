(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerController",PartnerController);

    function PartnerController($rootScope,PartnerOrgInfoService,OrgInfoService,$location) {
        var vm = this;
        vm.message = null;
        vm.pid = $rootScope.currentUser._id;
        vm.currentView = "CS";

        vm.currentSemData = [
            {id:1,appName:'App1',status:'In Progress',editBy:'xxx@gmail.com',editAt:'2017-10-16 16:55'},
            {id:2,appName:'App2',status:'In Progress',editBy:'xxx@gmail.com',editAt:'2017-10-15 18:55'},
            {id:3,appName:'App3',status:'Approved',editBy:'xxx@gmail.com',editAt:'2017-10-12 08:30'}
        ];

        vm.prevSemData = [
            {id:1,appName:'App1',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-16 16:55'},
            {id:2,appName:'App2',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-15 18:55'},
            {id:3,appName:'App3',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-12 08:30'}
        ];


        function init(){
            console.log('Method init:: 26  getUserOrgId --'+$rootScope.currentUser._id);
            if ($rootScope.currentUser !== undefined && $rootScope.currentUser._id !== undefined) {
            PartnerOrgInfoService.getUserOrgId($rootScope.currentUser)
                .then(function(response){
                    console.log('Method init:: 29  getUserOrgId :: response--'+response.data.orgId);
                    $rootScope.currentUser.orgId = response.data.orgId;

                    OrgInfoService.getOrgById($rootScope.currentUser.orgId)
                        .then(function (res) {
                            console.log('Method init:: 34  getOrgById --'+res.data);
                            vm.userOrgInfo = res.data;
                            if(vm.userOrgInfo.status === 'NoStatus')
                                $location.url("/OrgNotYetApproved");
                            else if(vm.userOrgInfo.status === 'Rejected')
                                $location.url("/OrgRejected");
                        })
                })
            }
        }init();

    }
})();