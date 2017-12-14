(function() {
    "use strict";
    var myApp=angular.module("ServiceLearningApp");
    myApp.factory('Excel',function($window){
        var uri='data:application/vnd.ms-excel;base64,',
            template='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
            base64=function(s){return $window.btoa(unescape(encodeURIComponent(s)));},
            format=function(s,c){return s.replace(/{(\w+)}/g,function(m,p){return c[p];})};
        return {
            tableToExcel:function(tableId,worksheetName){
                var table=$(tableId),
                    ctx={worksheet:worksheetName,table:table.html()},
                    href=uri+base64(format(template,ctx));
                return href;
            }
        };
    });

    myApp.controller("AdminController",AdminController);

    function AdminController($rootScope,$location,$routeParams,$scope,$http,UserService,PartnerOrgInfoService,OrgInfoService,FormService,$window,Excel, $timeout) {
        var vm = this;

        vm.aid = $rootScope.currentUser._id;
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
        vm.archiveAllForms=archiveAllForms;
        //vm.makeAuthVisible = makeAuthVisible;
        vm.makeOppInfoVisibleFlag = false;
        vm.makeOppInfoVisible = makeOppInfoVisible;
        vm.registerOppInfo =registerOppInfo;
        vm.getOppInfo = getOppInfo;
        vm.oppInfoArr = [];
        vm.approveOppInfo = approveOppInfo;
        vm.getTable =getTable;
        vm.allUsers = [];
        vm.mapUserToOrg = mapUserToOrg;
        vm.getModelDisplay = getModelDisplay;


        function init(){

            // console.log("current user "+$rootScope.currentUser.data._id)
            // if(vm.currentuser === undefined) {


            if($rootScope.currentUser) {
                console.log("admin controller- user id"+$rootScope.currentUser._id);
                vm.currentuser = $rootScope.currentUser;
            }else{

                $location.url("/login");
            }

            var user = {status:"NoStatus"};
            UserService.getAllUsers(user)
                .then(function (success) {
                    vm.users = success.data;
                    vm.users = JSON.parse(JSON.stringify(vm.users));

                    removeDuplicates(vm.users,'username');
                } ,function (error){
                    console.log('Error'+error);
                });

            var user = {role:"FACULTY"};
            UserService.fetchAll(user)
                .then(function (success) {
                    vm.users = success.data;
                    vm.allUsers = JSON.parse(JSON.stringify(vm.users));
                    //removeDuplicates(vm.users,'username');
                } ,function (error){
                    console.log('Error'+error);
                });

        }init();

        function archiveAllForms() {

            FormService.findFormsActive()
                .then(function (response1) {
                    // console.log(response1.data)
                    var applicationIds=response1.data

                    for(var i in applicationIds)
                    {
                        console.log(applicationIds[i]._id)
                        FormService.archiveForm(applicationIds[i]._id)
                            .then(
                                function (response) {
                                    console.log(response.data)
                                    vm.success="All Applications have been Archived"
                                },function (err) {
                                    vm.failure="Error while archiving applications"
                                    console.log(err)
                                }
                            )
                    }

                },function (err) {
                    console.log(err)
                })

            // FormService.archiveAllForms()
            //     .then(
            //         function (response) {
            //             console.log(response.data)
            //             vm.success="All Applications have been Archived"
            //         },function (err) {
            //             vm.failure="Error while archiving applications"
            //             console.log(err)
            //         }
            //     )
        }


        function changeView(view) {
            vm.message = null;
            vm.user = {};
            vm.users = [];
            vm.OrgsInfo = [];

            if(view === 'Approve/Reject'){
                var user = {status:"NoStatus"};
                vm.allOrgUserId = [];
                 PartnerOrgInfoService.getAllOrgUserInfo(user)
                    .then(function(response){
                        console.log("line 150 update the Org Id", +response.data+"---response.orgId ---"+response.data);
                        vm.allOrgUserId = response.data;
                        UserService.getAllUsers(user)
                            .then(function (success) {
                                vm.users = success.data;
                                vm.users = JSON.parse(JSON.stringify(vm.users));
                                vm.usersArr = [];
                                for (var g = 0 ; g < vm.users.length ; g++) {
                                    var userObj = vm.users[g];
                                    for (var h = 0 ; h < vm.allOrgUserId.length ; h++) {
                                        if (userObj._id === vm.allOrgUserId[h].userId) {
                                            userObj.orgName = vm.allOrgUserId[h].orgName;
                                        }
                                    }
                                    vm.usersArr.push(userObj);
                                }
                                removeDuplicates(vm.users,'username');
                            } ,function (error){

                            });
                    }, function(err){
                        console.log(err);
                    });

            }

            if(view === 'UserInfo'){
                vm.adminAuthenticateMD = true;
                vm.adminAuthenticateMDGrid = false;
                vm.makeCreateUserVisibleFlag = true;
                vm.userInfoGrid = true;
                vm.allOrgUserId = [];
                PartnerOrgInfoService.getAllOrgUserInfo(user)
                    .then(function(response){
                        console.log("line 150 update the Org Id", +response.data+"---response.orgId ---"+response.data);
                        vm.allOrgUserId = response.data;
                        UserService.fetchAll(vm.user)
                            .then(function (success) {
                                vm.users = success.data;
                                vm.users = JSON.parse(JSON.stringify(vm.users));
                                vm.usersArr = [];
                                for (var g = 0 ; g < vm.users.length ; g++) {
                                    var userObj = vm.users[g];
                                    for (var h = 0 ; h < vm.allOrgUserId.length ; h++) {
                                        if (userObj._id === vm.allOrgUserId[h].userId) {
                                            userObj.orgName = vm.allOrgUserId[h].orgName;
                                        }
                                    }
                                    vm.usersArr.push(userObj);
                                }
                                removeDuplicates(vm.users,'username');
                            } ,function (error){

                            });
                    }, function(err){
                        console.log(err);
                    });


            //     UserService.fetchAll(vm.user)
            //         .then(function (success) {
            //             vm.users = success.data;
            //             vm.users = JSON.parse(JSON.stringify(vm.users));
            //             removeDuplicates(vm.users,'username');
            //             //console.log(vm.aid);
            //         } ,function (error){
            //             console.log(':: makeUserInfoVisible :: error --'+error);
            //         });
             }

            if(view === 'NewUser'){
                OrgInfoService.getAllOrg()
                    .then(function(allOrg){
                        vm.OrgsInfo = allOrg.data;
                    });
            }
            OrgInfoService.getAllOrg()
                .then(function(allOrg){
                    vm.OrgsInfo = allOrg.data;
                });
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
                    // UserService.fetchAll(user)
                    //     .then(function (success) {
                    //         vm.users = success.data;
                    //         vm.users = JSON.parse(JSON.stringify(vm.users));
                    //         removeDuplicates(vm.users,'username');
                    //         //console.log(vm.aid);
                    //     } ,function (error){
                    //         console.log(':: deleteUserCancel :: error --'+error);
                    //     });
                    vm.allOrgUserId = [];
                    PartnerOrgInfoService.getAllOrgUserInfo(user)
                        .then(function(response){
                            console.log("line 150 update the Org Id", +response.data+"---response.orgId ---"+response.data);
                            vm.allOrgUserId = response.data;
                            UserService.fetchAll(vm.user)
                                .then(function (success) {
                                    vm.users = success.data;
                                    vm.users = JSON.parse(JSON.stringify(vm.users));
                                    vm.usersArr = [];
                                    for (var g = 0 ; g < vm.users.length ; g++) {
                                        var userObj = vm.users[g];
                                        for (var h = 0 ; h < vm.allOrgUserId.length ; h++) {
                                            if (userObj._id === vm.allOrgUserId[h].userId) {
                                                userObj.orgName = vm.allOrgUserId[h].orgName;
                                            }
                                        }
                                        vm.usersArr.push(userObj);
                                    }
                                    removeDuplicates(vm.users,'username');
                                } ,function (error){

                                });
                        }, function(err){
                            console.log(err);
                        });

                } ,function (error){
                    console.log(':: makeUserInfoVisible :: error --'+error);
                });
        }


        function makeOppInfoVisible () {

            vm.makeOppInfoVisibleFlag = true;

        }

        function registerOppInfo(oppInfo) {

            if(!oppInfo.oppHeader){
                vm.message = "Please enter a Opportunity Name";
                return;
            }

            if(!oppInfo.oppBody){
                vm.message = "Please enter a Opportunity Desc";
                return;
            }
            oppInfo.publishTo = "0";
            oppInfo.userid = vm.currentuser._id;
            oppInfo.createdBy = vm.currentuser._id;
            oppInfo.adminId = vm.currentuser._id;
            oppInfo.status = "available";
            vm.currentuser.opportunities = oppInfo;
            UserService.addOppInfo(vm.currentuser).then(function(user){
                    console.log("returned from adding Opportunity ..",user);
                    vm.message = "Opportunity has been added successfully...";
                },function(err){
                    console.log(err);
                }

            );





        }

        function getOppInfo() {
            vm.oppInfoArr = [];
            UserService.getAllOppInfo(vm.currentuser).then(function(user){
                    console.log("returned from adding Opportunity ..",user.data);
                    for (var g = 0; g< user.data.length ;g ++) {
                        var oppInfoArrNew = user.data[g].opportunities;
                        vm.oppInfoArr = vm.oppInfoArr.concat(oppInfoArrNew);
                    }

                    // $scope.viewby = 10;
                    // $scope.totalItems = vm.oppInfoArr.length;
                    // $scope.currentPage = 4;
                    // $scope.itemsPerPage = $scope.viewby;
                    // $scope.maxSize = 5; //Number of pager buttons to show
                    //
                    // $scope.setPage = function (pageNo) {
                    //     $scope.currentPage = pageNo;
                    // };
                    //
                    // $scope.pageChanged = function() {
                    //     console.log('Page changed to: ' + $scope.currentPage);
                    // };
                    //
                    // $scope.setItemsPerPage = function(num) {
                    //     $scope.itemsPerPage = num;
                    //     $scope.currentPage = 1; //reset to first page
                    // }
                },function(err){
                    console.log(err);
                }

            );

        }

        $scope.exportToExcel=function(tableId){ // ex: '#my-table'
            var exportHref=Excel.tableToExcel(tableId,'OppurtunitiesExport');
            $timeout(function(){location.href=exportHref;},100); // trigger download
        }

        function approveOppInfo(oppInfo,status) {
            oppInfo.status = status;
            oppInfo.approvedBy = vm.currentuser._id;
            oppInfo.allocatedTo = oppInfo.partnerId;
            oppInfo.allocatedDate = new Date();
            UserService.updateOppInfoApproved(oppInfo).then(function(user){
                console.log("returned from approveOppInfo ..",user);
                vm.oppInfoArr = [];
                UserService.getAllOppInfo(vm.currentuser).then(function(user){
                    console.log("returned from approveOppInfo getAll ..",user.data);
                    for (var g = 0; g< user.data.length ;g ++) {
                        var oppInfoArrNew = user.data[g].opportunities;
                        vm.oppInfoArr = vm.oppInfoArr.concat(oppInfoArrNew);
                    }
                },function(err){
                    console.log(err);
                } );
                vm.message = "Opportunity has been approved , allocated to "+oppInfo.partnerId;
            },function(err){
                console.log(err);
            });

        }

        function mapUserToOrg(mapOrgUser){
            if(!mapOrgUser.orgId){
                vm.message = "Please Select Organisation";
                return;
            }

            if(!mapOrgUser.userId){
                vm.message = "Please Select User ";
                return;
            }
            var userObj = {_id:mapOrgUser.userId};
            PartnerOrgInfoService.getUserOrgId(userObj).then(function(user){
                    console.log("returned from getUserOrgId ..",user);
                    user.data.orgId = mapOrgUser.orgId;
                    for (var h = 0 ; h < vm.OrgsInfo.length ; h ++) {
                        if (user.data.orgId === vm.OrgsInfo[h]._id) {
                            user.data.orgName = vm.OrgsInfo[h].name;
                        }
                    }
                    PartnerOrgInfoService.updateOrgUserInfo(user.data).then(function(user){
                            console.log("returned from getUserOrgId ..",user);
                            vm.message = "Mapping has been updated Successfully";
                        },function(err){
                            console.log(err);
                        }
                    );
                },function(err){
                    console.log(err);
                }

            );

        }

        function getModelDisplay(userId) {
            var userObj = {_id:userId};
            PartnerOrgInfoService.getUserOrgId(userObj).then(function(user){
                    console.log("returned from getUserOrgId ..",user);
                    vm.orgName = user.data.orgName;

                },function(err){
                    console.log(err);
                }

            );

        }

        function getTable() {
            // $(document).ready(function() {
            //     $('#example').DataTable();
            // } );
        }

    }
})();