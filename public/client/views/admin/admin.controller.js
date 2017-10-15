(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminController",AdminController);

    function AdminController($rootScope,$location,$routeParams) {
        var vm = this;
        vm.aid = $routeParams.aid;


        function init(){
            console.log(vm.aid)
        }init();



    }
})();