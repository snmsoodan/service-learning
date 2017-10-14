(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.register = register;

        function init(){
            console.log("register")
        }init();

        function register(radio) {
           if(radio==='1')
           {
               $location.url("/faculty/1");
           }
           else if(radio==='2')
           {
               $location.url("/partner");
           }
           else if(radio==='3')
           {
               $location.url("/admin");
           }
        }

    }
})();