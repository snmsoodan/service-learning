(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("FacultyController",FacultyController);

    function FacultyController($rootScope,$location) {
        var vm = this;
        vm.message = null;


        function init(){
            console.log("faculty")
        }init();



    }
})();