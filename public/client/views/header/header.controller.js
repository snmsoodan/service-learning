(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("HeaderController",HeaderController);

    function HeaderController($rootScope,$location) {
        var vm = this;
        vm.logout = logout;

        function init() {
            alert("---");
        }

        init();

        function logout() {
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