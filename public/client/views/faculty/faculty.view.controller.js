(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("FacultyController",FacultyController);

    function FacultyController($rootScope,$location,$routeParams) {
        var vm = this;
        vm.fid = $routeParams.fid;
        vm.user = $rootScope.currentUser;
        function init(){
            console.log(vm.fid)

        }init();
    }
})();