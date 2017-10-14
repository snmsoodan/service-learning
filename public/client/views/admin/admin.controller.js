(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminController",AdminController);

    function AdminController($rootScope,$location) {
        var vm = this;
        vm.message = null;


        function init(){
            console.log("admin")
        }init();



    }
})();