(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("RegisterController",RegisterController);

    function RegisterController($rootScope,$location,$scope,$http) {
        var vm = this;
        vm.message = '';
        vm.register = register;
        vm.myradio = '1';
        function init(){
            console.log("register")
        }init();

        function register(radio) {
            if (radio) {

                console.log('--registerUser--'+JSON.stringify($scope.registerUser));
                sessionStorage.setItem('registrationObject',JSON.stringify($scope.registerUser));
                if(radio===1)
                {
                    $scope.registerUser = {'username':$scope.username,'password':$scope.password,'firstname':$scope.firstname,'lastname':$scope.lastname,'role':'FACULTY'};

                    $http.post('/api/register/', {params: {name: JSON.stringify($scope.registerUser)}})
                        .then(
                            function(success){
                                vm.message = success.data;
                            })
                        .catch(
                            function(error){
                                vm.message = error.data;
                            });

                }
                else if(radio===2)
                {
                    $scope.registerUser = {'username':$scope.username,'password':$scope.password,'firstname':$scope.firstname,'lastname':$scope.lastname,'role':'PARTNER'};

                    $http.post('/api/register/', {params: {name: $scope.registerUser}})
                        .then(
                            function(success){
                                vm.message = success.data.note;
                            })
                        .catch(
                            function(error){
                                vm.message = error.data;
                            });
                    vm.message = "Your Request has been submitted to Admin , please login after sometime";
                }
                else if(radio===3)
                {
                    $scope.registerUser = {'username':$scope.username,'password':$scope.password,'firstname':$scope.firstname,'lastname':$scope.lastname,'role':'ADMIN'};

                    $http.post('/api/register/', {params: {name: JSON.stringify($scope.registerUser)}})
                        .then(
                            function(success){
                                $location.url("/admin");
                                vm.message = success.data;
                            })
                        .catch(
                            function(error){
                                vm.message = error.data;
                            });
                }
            } else {
                vm.message = "please select the Role";

            }

        }

    }
})();