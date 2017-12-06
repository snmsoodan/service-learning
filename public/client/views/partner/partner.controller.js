(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerController",PartnerController);

    function PartnerController($rootScope,PartnerOrgInfoService,OrgInfoService,FormService,FieldService,$location) {
        var vm = this;
        vm.message = null;
        vm.pid = $rootScope.currentUser._id;
        vm.currentView = "CS";
        vm.changeView = changeView;
        vm.startApp = startApp;
        vm.forms = [];
        vm.fields = [];


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
            console.log("in partner controller");

            if($rootScope.currentUser._id){
                PartnerOrgInfoService.getUserOrgId($rootScope.currentUser._id)
                    .then(function(response){
                        $rootScope.currentUser.orgId = response.data.orgId;

                        OrgInfoService.getOrgById($rootScope.currentUser.orgId)
                            .then(function (res) {
                                vm.userOrgInfo = res.data;
                                if(vm.userOrgInfo.status === 'NoStatus')
                                    $location.url("/OrgNotYetApproved");
                                else if(vm.userOrgInfo.status === 'Rejected')
                                    $location.url("/OrgRejected");
                            })
                    })
            }

        }init();

        function startApp(){
            FormService.findAllForms()
                .then(function(userForms){
                    vm.forms = userForms.data;
                    FieldService.findFieldByForm(vm.forms[0]._id)
                        .then(function(response){
                                vm.fields = response.data;
                                console.log("hrrer");
                            },
                            function(err){
                                console.log(err);
                            });
                },function(err){
                    console.log(err);
                });
        }

        function changeView(view) {
            vm.currentView = view;
        }

    }
})();