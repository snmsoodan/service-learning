(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($rootScope,$location) {
        var vm = this;
        vm.logout = logout;

        function init() {
            $rootScope.currentUser = sessionStorage.getItem('currentUser');
            if ($rootScope.currentUser === null) {
                $location.url("/login?message=Kindly login , session has expired");
            }
        }

        init();

        function logout() {
            $rootScope.currentUser = null;
            sessionStorage.removeItem('currentUser');
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