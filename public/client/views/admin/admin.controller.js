(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminController",AdminController);

    function AdminController($rootScope,$location,$routeParams,$scope,$http) {
        var vm = this;
        vm.aid = $routeParams.aid;
        vm.activateRejectUser = activateRejectUser;

        function init(){
            var user = {};
            $http.post("/api/getAllUsers", user).then(function (success) {
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

            $http.post('/api/getRegisterReject/', {params: {name: JSON.stringify(user)}})
                .then(
                    function(success){
                        vm.message = success.data;
                    })
                .catch(
                    function(error){
                        vm.message = error.data;
                    });
            vm.users = [];
            $http.post("/api/getAllUsers", user).then(function (success) {
                vm.users = success.data;
                vm.users = JSON.parse(JSON.stringify(vm.users));
                removeDuplicates(vm.users,'username');
                console.log(vm.aid)
            } ,function (error){

            });
            //vm.users = sessionStorage.getItem('userDao');

        }

        function rejectUserCancel(user,status,type) {
            //if (type === '4') {
            user.status = status;
            user.reason = '';
            user.reject = false;
            //}
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