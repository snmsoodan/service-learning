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

            if (!user) {
                vm.message = "Please enter login details";
                return;
            }

            UserService.login(user)
                .then(function (response) {
                        $rootScope.currentUser = response.data;
                        if ($rootScope.currentUser.role === "FACULTY") {
                            $location.url("/faculty/" + user._id);
                        }

                        if ($rootScope.currentUser.role === "ADMIN") {
                            vm.userDao = users;
                            sessionStorage.userDao = JSON.stringify(users);
                            $location.url("/admin/" + user._id);
                        }

                        if ($rootScope.user.role === "PARTNER") {
                            $location.url("/partner");
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