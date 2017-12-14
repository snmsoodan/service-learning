(function() {
    angular.module("ServiceLearningApp")
        .factory("UserService", UserService);


    function UserService($http){

        var model = {
            login:login,
            register:register,
            getAllUsers:getAllUsers,
            activateRejectUser:activateRejectUser,
            findUser:findUser,
            updateUser:updateUser,
            deleteUser:deleteUser,
            fetchAll:fetchAll,
            findUserById:findUserById,
            addOppInfo: addOppInfo,
            getAllOppInfo:getAllOppInfo,
            updateOppInfo:updateOppInfo,
            updateOppInfoApproved:updateOppInfoApproved
        };

        return model;


        function findUserById(id) {
            return $http.get("/api/findUserById/"+id);
        }

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

        function findUser(user){
            return  $http.post("/api/findUser",user);
        }

        function updateUser(user){
            return  $http.post("/api/updateUser",user);
        }
        function deleteUser(user) {
            return  $http.post("/api/deleteUser",user);
        }

        function fetchAll(user){
            return  $http.post("/api/fetchAll",user);
        }

        function addOppInfo(info) {
            return $http.post("/api/addOppInfo",info);

        }

        function getAllOppInfo(info) {
            return $http.post("/api/getAllOppInfo",info);
        }

        function updateOppInfo(info) {
            return $http.post("/api/updateOppInfo",info);
        }


        function updateOppInfoApproved(info) {
            return $http.post("/api/updateOppInfoApproved",info);
        }



    }
})();