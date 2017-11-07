(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminController",AdminController);

    var partners=[
        {_id: "123", name: "alice", applicationId:"1" },
        {_id: "234", name: "bob", applicationId:"2" },
        {_id: "345", name: "charly", applicationId:"3"  },
        {_id: "456", name: "jannunzi", applicationId:"4" }
    ]

    function AdminController($rootScope,$location,$routeParams,$scope,$http,UserService) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.activateRejectUser = activateRejectUser;
        vm.partners=partners;

        function init(){
            var user = {status:"NoStatus"};
            UserService.getAllUsers(user)
                .then(function (success) {
                    vm.users = success.data;
                    vm.users = JSON.parse(vm.users);
                    removeDuplicates(vm.users,'username');
                    console.log(vm.aid)
                } ,function (error){

                });

        }init();

        function activateRejectUser(user,status,type) {

            if (type === '0') {
                user.status = status;
            } else if (type === '1') {
                user.reject = true;
                user.status = status;
                return;
            } else if (type === '2') {
                user.reject = false;
                user.status = status;
            }


            UserService.activateRejectUser(user)
                .then(
                    function(success){
                        vm.message = success.data;
                        vm.users = [];
                        var user = {status:"NoStatus"};
                        UserService.getAllUsers(user)
                            .then(function (success) {
                                vm.users = success.data;
                                vm.users = JSON.parse(JSON.stringify(vm.users));
                                removeDuplicates(vm.users,'username');
                                console.log(vm.aid)
                            } ,function (error){

                            });
                    })
                .catch(
                    function(error){
                        vm.message = error.data;
                    });


        }

        function rejectUserCancel(user,status,type) {
            user.status = status;
            user.reason = '';
            user.reject = false;
        }

        function removeDuplicates(originalArray, objKey) {
            var trimmedArray = [];
            var values = [];
            var value;

            for(var i = 0; i < originalArray.length; i++) {
                if (originalArray[i] != null) {
                    value = originalArray[i][objKey];
                    if(values.indexOf(value) === -1) {
                        trimmedArray.push(originalArray[i]);
                        values.push(value);
                    }
                }
            }
            return trimmedArray;
        }
    }
})();