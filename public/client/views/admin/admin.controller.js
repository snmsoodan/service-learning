(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("AdminController",AdminController);

    // var partners=[
    //     {_id: "123", name: "alice", applicationId:"1" },
    //     {_id: "234", name: "bob", applicationId:"2" },
    //     {_id: "345", name: "charly", applicationId:"3"  },
    //     {_id: "456", name: "jannunzi", applicationId:"4" }
    // ]

    function AdminController($rootScope,$location,$routeParams,$scope,$http,UserService,PartnerOrgInfoService,OrgInfoService) {
        var vm = this;

        // vm.aid = $routeParams.aid;
        // console.log($rootScope.currentUser._id)
        vm.activateRejectUser = activateRejectUser;
        // vm.partners=partners;
        // console.log($rootScope.currentUser._id)
        vm.aid=$rootScope.currentUser._id;
        console.log(vm.aid)
        vm.aid = $routeParams.aid;
        vm.currentuser = $rootScope.currentUser;
        vm.activateRejectUser = activateRejectUser;
        // vm.partners=partners;
        vm.authAdmin = authAdmin;
        vm.registerAdmin = registerAdmin;
        vm.authenticateAdmin = 'false';
        vm.adminAuthenticateMD = true;
        vm.adminAuthenticateMDGrid = false;
        vm.changeView = changeView;


        function init(){
            if(vm.currentuser === undefined) {
                $location.url("/login");
            }
            var user = {status:"NoStatus"};
            UserService.getAllUsers(user)
                .then(function (success) {
                    vm.users = success.data;
                    vm.users = JSON.parse(JSON.stringify(vm.users));
                    removeDuplicates(vm.users,'username');
                } ,function (error){

                });

        }init();


        function changeView(view) {
            vm.message = null;
            vm.currentView = view;
        }


        function activateRejectUser(user,status,type) {

            if (type === '0') {
                user.status = status;
            } else if (type === '1') {
                user.reject = true;
                user.status = status;
                return;
            } else if (type === '2') {
                user.reject = false;
                user.status = status;
            }
            var stat = status;

            UserService.activateRejectUser(user)
                .then(
                    function(success){
                        //vm.message = success.data;
                        var user = success.data;
                        var obj =  success.data;
                        if (user.role === 'PARTNER') {
                            PartnerOrgInfoService.getUserOrgId(user)
                                .then(function(response){
                                    console.log("line 55 update the Org Id", +response.data+"---response.orgId ---"+response.data.orgId);
                                    // $location.url("/partner");
                                    response.data.status = status;
                                    var stat = status;
                                    OrgInfoService.updateOrgById(response.data).then(
                                        function(res) {
                                            console.log('--updated the Org ID for the Partner '+res);
                                        } ,
                                        function (err) {
                                            console.log('--updated the Org ID for the Partner Err '+err);
                                        });
                                    var mailData = {'username':obj.username,'status':stat};
                                    OrgInfoService.sendMailAp(mailData).then(function (response) {
                                        var user = success.data;
                                        console.log('Mail has been sent for the user '+user.username);
                                        vm.message = "User has been "+user.status+" ...Mail has been sent to user ";
                                    },function (error) {
                                        console.log('Mail Sending Failed'+error);
                                    });
                                }, function(err){
                                    console.log(err);
                                });
                        }
                        vm.users = [];
                        var user = {status:"NoStatus"};
                        UserService.getAllUsers(user)
                            .then(function (success) {
                                vm.users = success.data;
                                vm.users = JSON.parse(JSON.stringify(vm.users));
                                removeDuplicates(vm.users,'username');
                                console.log(vm.aid)
                            } ,function (error){

                            });
                    })
                .catch(
                    function(error){
                        vm.message = error.data;
                    });


        }

        function rejectUserCancel(user,status,type) {
            user.status = status;
            user.reason = '';
            user.reject = false;
        }

        function removeDuplicates(originalArray, objKey) {
            var trimmedArray = [];
            var values = [];
            var value;

            for(var i = 0; i < originalArray.length; i++) {
                if (originalArray[i] != null) {
                    value = originalArray[i][objKey];
                    if(values.indexOf(value) === -1) {
                        trimmedArray.push(originalArray[i]);
                        values.push(value);
                    }
                }
            }
            return trimmedArray;
        }

        function authAdmin(admin) {
            if(!admin.username){
                vm.message = "Please enter a user name";
                return;
            }
            if(!admin.password){
                vm.message = "Please enter a password";
                return;
            }


            UserService.login(admin)
                .then(function (response) {
                        $rootScope.currentUser = response.data;
                        if ($rootScope.currentUser.role === "ADMIN" && $rootScope.currentUser.status === "Approved") {
                            vm.authenticateAdmin = 'true';
                        } else {
                            vm.message = "User is not Active";
                        }
                    },
                    function (err) {
                        vm.message = "username or password not found";
                    });

        }

        function registerAdmin(admin) {

            vm.message = null;

            if(!admin){
                vm.message = "Please enter details";
                return;
            }

            if(!admin.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!admin.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!admin.username || admin.username.indexOf("@northeastern.edu") === -1){
                vm.message = "Please enter your northeastern email id";
                return;
            }

            if(!admin.password){
                vm.message = "Please enter a password";
                return;
            }
            admin.role = "ADMIN";
            admin.status = "Approved";

            UserService.register(admin)
                .then(function(user){
                        console.log("returned from registering faculty",user);
                        //$rootScope.currentUser = null;
                        //$location.url("/login?message=Admin has been created successfully...");
                        vm.message = "Admin has been created successfully... kindly login...";
                        vm.adminAuthenticateMD = true;
                        vm.adminAuthenticateMDGrid = false;
                    },function(err){
                        console.log(err);
                    }
                );
        }
    }
})();