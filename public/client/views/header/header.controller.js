(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($rootScope,$location) {
        var vm = this;
        vm.logout = logout;

        function init() {

        }

        init();

        function logout() {
            $rootScope.currentUser = null;
            console.log("checck" +$rootScope.currentUser);
           /* UserService.logout()
                .then(function () {
                    $rootScope.currentUser = null;
                    $location.url('/home');
                }, function (err) {
                    console.log(err);
                });*/

        }
    }
})();