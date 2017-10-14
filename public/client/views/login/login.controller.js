(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("LoginController",LoginController);

    function LoginController($rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function init(){

        }init();

        function login(user) {

        }

    }
})();