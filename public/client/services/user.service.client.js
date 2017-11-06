(function() {
    angular.module("ServiceLearningApp")
        .factory("UserService", UserService);


    function UserService($http){

        var model = {
            login:login,
            register:register
        };

        return model;

        function login(user) {
            console.log("client server login",user);
            return $http.post("/api/login",user);
        }

        function register(newUser) {
            return $http.post("/api/register",newUser);
        }
    }
})();
