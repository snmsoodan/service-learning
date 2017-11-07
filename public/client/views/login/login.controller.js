(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("LoginController",LoginController);


    function LoginController(UserService,$rootScope,$location) {
        var vm = this;
        vm.login = login;
        vm.createUsers = createUsers;
        vm.userDao = [];

        function init(){

        }init();

        function login(user) {

            console.log("user login info"+user);

            if (!user) {
                vm.message = "Please enter login details";
                return;
            }

            UserService.login(user)
                .then(function (response) {
                        $rootScope.currentUser = response.data;
                        if ($rootScope.currentUser.role === "FACULTY" && $rootScope.currentUser.status === "Approved") {
                            console.log('-----user console'+$rootScope.currentUser.status);
                            $location.url("/faculty/");
                        } else  if ($rootScope.currentUser.role === "ADMIN" && $rootScope.currentUser.status === "Approved") {
                            //vm.userDao = users;
                            //sessionStorage.userDao = JSON.stringify(users);
                            $location.url("/admin/");
                        } else if ($rootScope.currentUser.role === "PARTNER" && $rootScope.currentUser.status === "Approved") {
                            $location.url("/partner");
                        } else {
                            vm.message = "User is not Active";
                        }
                    },
                    function (err) {
                        vm.message = "username or password not found";
                    });
        }



        function createUsers() {
            var user = {username:'test'};

            $http.post("/api/createData", user).then(function (success){
                var user = success.data.note;
                vm.message =user;
            },function (error){
                vm.message =error;
            });

        }

    }
})();