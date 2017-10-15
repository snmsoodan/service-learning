(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerController",PartnerController);

    function PartnerController($rootScope,$location) {
        var vm = this;
        vm.message = null;


        function init(){
            console.log("partner")
        }init();



    }
})();