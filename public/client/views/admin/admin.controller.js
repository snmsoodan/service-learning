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

        vm.aid = $rootScope.currentUser.data._id;
        // console.log($rootScope.currentUser._id)
        vm.activateRejectUser = activateRejectUser;
        // vm.partners=partners;
        // console.log($rootScope.currentUser._id)
        //vm.aid=JSON.parse(sessionStorage.getItem('currentUser'))._id;
        //console.log(vm.aid);
        vm.activateRejectUser = activateRejectUser;
        // vm.partners=partners;
        vm.authAdmin = authAdmin;
        vm.registerAdmin = registerAdmin;
        vm.authenticateAdmin = 'false';
        vm.adminAuthenticateMD = true;
        vm.adminAuthenticateMDGrid = false;
        vm.changeView = changeView;
        vm.makeApproveVisible =makeApproveVisible;
        vm.makeCreateUserVisible = makeCreateUserVisible;
        vm.makeCreateUserVisibleFlag = true;
        vm.registerPartner = registerPartner;
        vm.orgRegister = orgRegister;
        vm.registerFaculty = registerFaculty;
        vm.registerEnableOrf =registerEnableOrf;
        vm.orgInfoClass = 'partner';
        vm.userInfoGrid = false;
        vm.deleteUserCancel =deleteUserCancel;
        //vm.makeAuthVisible = makeAuthVisible;


        function init(){

            // console.log("current user "+$rootScope.currentUser.data._id)
            if(vm.currentuser === undefined) {


            if($rootScope.currentUser) {
                console.log("admin controller- user id"+$rootScope.currentUser._id);
                vm.currentuser = $rootScope.currentUser;
            }else{

                $location.url("/login");
            }

        }init();


        function changeView(view) {
            vm.message = null;
            vm.user = {};
            vm.users = [];
            vm.OrgsInfo = [];

            if(view === 'Approve/Reject'){
                var user = {status:"NoStatus"};
                UserService.getAllUsers(user)
                    .then(function (success) {
                        vm.users = success.data;
                        vm.users = JSON.parse(JSON.stringify(vm.users));
                        removeDuplicates(vm.users,'username');
                    } ,function (error){

                    });
            }

            if(view === 'UserInfo'){
                vm.adminAuthenticateMD = true;
                vm.adminAuthenticateMDGrid = false;
                vm.makeCreateUserVisibleFlag = true;
                vm.userInfoGrid = true;
                UserService.fetchAll(vm.user)
                    .then(function (success) {
                        vm.users = success.data;
                        vm.users = JSON.parse(JSON.stringify(vm.users));
                        removeDuplicates(vm.users,'username');
                        //console.log(vm.aid);
                    } ,function (error){
                        console.log(':: makeUserInfoVisible :: error --'+error);
                    });
            }

            if(view === 'NewUser'){
                OrgInfoService.getAllOrg()
                    .then(function(allOrg){
                        vm.OrgsInfo = allOrg.data;
                    });
            }

            vm.currentView = view;

        }

        function makeAuthVisible () {
            vm.adminAuthenticateMD = false;
            vm.adminAuthenticateMDGrid = false;
            vm.makeCreateUserVisibleFlag = true;
        }

        function makeApproveVisible () {
            vm.adminAuthenticateMD = true;
            vm.adminAuthenticateMDGrid = true;
            vm.makeCreateUserVisibleFlag = true;
        }

        function makeCreateUserVisible() {
            vm.makeCreateUserVisibleFlag = false;
            vm.adminAuthenticateMDGrid = false;
            vm.userInfoGrid = false;
            OrgInfoService.getAllOrg()
                .then(function(allOrg){
                    vm.OrgsInfo = allOrg.data;
                });
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
                                //console.log(vm.aid)
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

            if(!admin.username){
                vm.message = "Please enter email id";
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
                        vm.admin = null;
                    },function(err){
                        console.log(err);
                    }
                );
        }

        function registerPartner(partner) {

            vm.message = null;

            if(!partner.orgId){
                vm.message = "Please select an organization";
                return;
            }

            if(!partner.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!partner.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!partner.username){
                vm.message = "Please enter an email address";
                return;
            }

            if(!partner.password){
                vm.message = "Please enter a password";
                return;
            }


            var newPartner = {
                "firstName":partner.firstName,
                "lastName":partner.lastName,
                "username":partner.username,
                "password":partner.password,
                "role":"PARTNER",
                "status":"Approved"
            };

            if(partner.orgId === "0" && partner.username === "admin@test.com"){
                newPartner.role="ADMIN";
            }

            UserService.register(newPartner)
                .then(function(user){
                        if(user)
                        {
                            $rootScope.currentUser = user.data;
                            $rootScope.currentUser.orgId = partner.orgId;
                            console.log("user data"+user);

                            if($rootScope.currentUser.role === "PARTNER"){
                                var info = {
                                    userId : user.data._id,
                                    orgId : partner.orgId
                                };
                                var userName = partner.username;
                                PartnerOrgInfoService.addUserOrgInfo(info)
                                    .then(function(response){
                                        console.log("after add User Org", +response);
                                        //$location.url("/partner");
                                        var mailData = {'username':userName,'status':'Approved'};
                                        OrgInfoService.sendMailAp(mailData).then(function (response) {
                                            var user = response.data;
                                            console.log('Mail has been sent for the user '+user.username);
                                            vm.message = "User has been approved , Mail has been sent to user ";
                                        },function (error) {
                                            console.log('Mail Sending Failed'+error);
                                        });
                                        vm.message = 'Partner Has been Successfully added';
                                        vm.partner = {};
                                    }, function(err){
                                        console.log(err);
                                    });
                            }
                            else if($rootScope.currentUser.role === "ADMIN")
                                $location.url("/admin");
                        }else {
                            vm.message = "email id already exists";
                        }
                    },function(err){
                        vm.message = err.data;
                        console.log(err);
                    }
                );
        }

        function orgRegister(partner,org){

            console.log("click worked");

            if(!partner.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!partner.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!partner.username){
                vm.message = "Please enter an email address";
                return;
            }

            if(!org.name){
                vm.message = "Please enter organization name";
                return;
            }

            if(!org.mission){
                vm.message = "Please enter organization mission";
                return;
            }

            org.status = 'Approved';
            partner.role = 'PARTNER';
            partner.status = 'Approved';

            console.log(org);

            OrgInfoService.addNewOrgInfo(org)
                .then(function(orgRes){

                    if(orgRes){

                        UserService.register(partner) //registering partner
                            .then(function(partnerInfo) {
                                console.log('----orgRes--'+orgRes.data._id);
                                $rootScope.currentUser = partnerInfo.data;
                                $rootScope.currentUser.orgId = orgRes.data._id;
                                var userOrgInfo = {
                                    userId : partnerInfo.data._id,
                                    orgId : orgRes.data._id
                                };

                                PartnerOrgInfoService.addUserOrgInfo(userOrgInfo) //entering partner and organization relation
                                    .then(function(response){
                                        console.log("after add User Org",+response);
                                        vm.message = "Partner and organisation has been registered successfully";
                                        vm.partner = null;
                                        vm.org = null;
                                    }, function(err){
                                        console.log(err);
                                    });

                            })
                    }

                });

        }

        function registerEnableOrf(value) {
            vm.orgInfoClass = value;
        }

        function registerFaculty(faculty) {

            vm.message = null;

            if(!faculty.firstName){
                vm.message = "Please enter a first name";
                return;
            }
            if(!faculty.lastName){
                vm.message = "Please enter a last name";
                return;
            }

            if(!faculty.username || faculty.username.indexOf("@northeastern.edu") === -1){
                vm.message = "Please enter your northeastern email id";
                return;
            }

            if(!faculty.password){
                vm.message = "Please enter a password";
                return;
            }

            var newFaculty = {
                "firstName":faculty.firstName,
                "lastName":faculty.lastName,
                "username":faculty.username,
                "password":faculty.password,
                "role":"FACULTY",
                "status":"Approved"
            };

            UserService.register(newFaculty)
                .then(function(user){
                        console.log("returned from registering faculty",user);
                        $rootScope.currentUser = user.data;
                        //$location.url("/login?message=Request for approval has been sent to ADMIN successfully...");
                        vm.message = "Faculty created successfully..";
                        vm.faculty = null;
                    },function(err){
                    vm.message = "Email already exists..";
                    console.log(err);
                    }
                );
        }

        function deleteUserCancel(user){

            UserService.deleteUser(user)
                .then(function (success) {
                    vm.users = console.log('---success User Deletion --'+success.data);
                    vm.message = "User has been successfully deleted";
                    UserService.fetchAll(user)
                        .then(function (success) {
                            vm.users = success.data;
                            vm.users = JSON.parse(JSON.stringify(vm.users));
                            removeDuplicates(vm.users,'username');
                            //console.log(vm.aid);
                        } ,function (error){
                            console.log(':: deleteUserCancel :: error --'+error);
                        });
                } ,function (error){
                    console.log(':: makeUserInfoVisible :: error --'+error);
                });
        }

    }
})();