(function() {
    angular.module("ServiceLearningApp")
        .factory("UserService", UserService);


    function UserService($http){

        var model = {
            login:login,
            register:register,
            getAllUsers:getAllUsers,
            activateRejectUser:activateRejectUser
        };

        return model;

        function login(user) {
            console.log("client server login",user);
            return $http.post("/api/login",user);
        }

        function register(newUser) {
            return $http.post("/api/register",newUser);
        }

        function activateRejectUser(user){
            return  $http.post("/api/getRegisterReject",user);
        }

        function getAllUsers(user){
            return  $http.post("/api/getAllUsers",user);
        }
    }
})();