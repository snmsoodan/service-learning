(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("MainController",MainController);

    function MainController($scope, $location) {
        $scope.$location = $location;
    }
})();