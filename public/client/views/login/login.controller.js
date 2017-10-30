(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("LoginController",LoginController);
//.controller('Page1Controller', ['$scope', "CommonService", function ($scope, CommonService)
    LoginController.$inject = ['$rootScope','$location','$http'];
    var users = [];
    // var users=[
    //     {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", role:"FACULTY"  },
    //     {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", role:"FACULTY"  },
    //     {_id: "345", username: "carl",   password: "carl",   firstName: "Charly", lastName: "Garcia", role:"ADMIN"  },
    //     {_id: "456", username: "dean", password: "dean", firstName: "Joe",   lastName: "Dean",role:"PARTNER" }
    // ];

    function LoginController($rootScope,$location,$http) {
        var vm = this;
        vm.message = null;
        vm.login = login;
        vm.createUsers = createUsers;
        vm.userDao = [];

        function init(){
            users = [];
            $http({
                method: 'GET',
                url: '/getUsers'
            }).then(function (success){
                var usersResp = success.data;
                users = [];
                for (var obj =0;usersResp.length ;obj++)
                {
                    var objArr = usersResp[obj];
                    if (objArr == undefined || objArr == null || objArr.username ==null) {
                        break;
                    }
                    users.push(objArr);
                }
            },function (error){

            });
        }

        init();

        function login(userEmail,password) {

            // var user = UserService.login(userEmail, password);
            // function login(username, password) {
            var user ={
                username: userEmail,
                password: password
            };


            $http.post("/api/login", user).then(function (success){

                var user = success.data;
                if(user.username===userEmail&&user.password===password&&user.status==="A")
                {
                    $rootScope.currentUser = user;
                    if(user.role === "FACULTY")
                    {
                        $location.url("/faculty/"+user._id);
                    }

                    if(user.role === "ADMIN")
                    {
                        vm.userDao = users;
                        sessionStorage.userDao = JSON.stringify(users);
                        $location.url("/admin/"+user._id);

                    }

                    if(user.role === "PARTNER")
                    {
                        $location.url("/partner");
                    }
                } else {
                    vm.message = "Invalid Credentials/User Not Activated , please contact admin";
                }
            },function (error){

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