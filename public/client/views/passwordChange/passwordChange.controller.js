(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PasswordChangeController",PasswordChangeController);


    function PasswordChangeController(UserService,$rootScope,$location,$routeParams) {
        var vm = this;
        vm.changePassword = changePassword;
        vm.message = $routeParams.message;
        vm.userDao = [];
        vm.user = {};

        function init(){
            vm.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
            if(vm.currentUser === undefined) {
                $location.url("/login?message=User Session timed out , re-login");
            }
            vm.currentUser.password = '';
            vm.user = vm.currentUser;
        }init();

        function changePassword(user) {

            console.log("user login info"+user);

            if (user.password === undefined || user.passwordNew === undefined || user.passwordRe === undefined) {
                vm.message = "Please enter user details";
                return;
            } else if (user.passwordNew !== user.passwordRe) {
                vm.message = "Enter New password and Retype password as same";
                return;
            } else if (user.password === user.passwordNew) {
                vm.message = "Current Password and New password are same";
                return;
            }

            var newPwd = user.passwordNew;
            UserService.login(user)
                .then(function (response) {
                        $rootScope.currentUser = response.data;
                        if ($rootScope.currentUser.status === "Approved") {
                            console.log('-----user Active and Eligible for Change Password'+$rootScope.currentUser.status);
                            $rootScope.currentUser.password = newPwd;
                            UserService.updateUser($rootScope.currentUser)
                                .then(
                                    function(success){
                                        vm.message = success.data;
                                        var user = success.data;
                                        console.log('Password has been updated to'+user.password+' for the user '+user.username);
                                        $location.url("/login?message=User password has been updated , Kindly re-login with new Password");
                                         vm.user = {};
                                    })
                                .catch(
                                    function(error){
                                        vm.message = error.data;
                                    });

                        } else {
                            vm.message = "User is not Active";
                        }
                    },
                    function (err) {
                        vm.message = "Username or password not found";
                    });
        }

    }
})();