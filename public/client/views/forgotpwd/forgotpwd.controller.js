(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("ForgotPwdController",ForgotPwdController);


    function ForgotPwdController(UserService,$rootScope,$location,$routeParams,OrgInfoService) {
        var vm = this;
        vm.forgotPwd = forgotPwd;
        vm.message = $routeParams.message;
        vm.forgotPwd = forgotPwd;
        vm.userDao = [];

        function init(){

        }init();

        function forgotPwd(user) {

            console.log("user login info"+user);

            if (!user) {
                vm.message = "Please enter login details";
                return;
            }

            UserService.findUser(user)
                .then(function (response) {
                        var currentUser = response.data;
                        if (currentUser.firstName === user.firstName && currentUser.lastName === user.lastName && currentUser.status === "Approved") {
                            console.log('-----user console'+currentUser.firstName);
                            var mailData = {'username':currentUser.username};
                            OrgInfoService.sendMail(mailData).then(function (response) {
                                currentUser.password = 'Welcome@123';
                                UserService.updateUser(currentUser)
                                    .then(
                                        function(success){
                                            vm.message = success.data;
                                            var user = success.data;
                                            console.log('Password has been updated to'+user.password+' for the user '+user.username);
                                            vm.message = "User password has been sent to mail , Kindly check your mail";
                                            vm.user = {};
                                        })
                                    .catch(
                                        function(error){
                                            vm.message = error.data;
                                        });
                            },function (error) {
                                console.log('Mail Sending Failed'+error);
                            });
                        } else {
                            vm.message = "User Credentials are not matching , Kindly contact admin";
                        }
                    },
                    function (err) {
                        vm.message = "username or password not found";
                    });

        }

    };

})();