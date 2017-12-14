(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("PartnerController",PartnerController);

    function PartnerController($rootScope,PartnerOrgInfoService,OrgInfoService,FormService,FieldService,$location,UserService,$route,$window,$timeout) {
        var vm = this;
        vm.message = null;
        vm.pid = $rootScope.currentUser._id;
        vm.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
        vm.currentView = "CS";
        vm.changeView = changeView;
        vm.startApp = startApp;
        vm.forms = [];
        vm.fields = [];
        vm.commitSubmit=commitSubmit;
        vm.commitSave=commitSave;
        vm.currentSemData=[];
        vm.findFormById=findFormById;
        vm.saveForm=saveForm
        vm.deleteFormById=deleteFormById;
        vm.saveFormInProgress=saveFormInProgress;
        vm.clone=clone;
        vm.checkOppInfo = checkOppInfo;
        vm.oppView = [];
        vm.oppInfoArr = [];
        // console.log(vm.pid);


        // vm.currentSemData = [
        //     {id:1,appName:'App1',status:'In Progress',editBy:'xxx@gmail.com',editAt:'2017-10-16 16:55'},
        //     {id:2,appName:'App2',status:'In Progress',editBy:'xxx@gmail.com',editAt:'2017-10-15 18:55'},
        //     {id:3,appName:'App3',status:'Approved',editBy:'xxx@gmail.com',editAt:'2017-10-12 08:30'}
        // ];

        // vm.prevSemData = [
        //     {id:1,appName:'App1',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-16 16:55'},
        //     {id:2,appName:'App2',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-15 18:55'},
        //     {id:3,appName:'App3',status:'Approved',editBy:'xxx@gmail.com',editAt:'2016-10-12 08:30'}
        // ];


        function init(){
            console.log("in partner controller"+$rootScope.currentUser._id);

            if($rootScope.currentUser._id) {
                PartnerOrgInfoService.getUserOrgId($rootScope.currentUser._id)
                    .then(function (response) {
                        $rootScope.currentUser.orgId = response.data.orgId;

                        OrgInfoService.getOrgById($rootScope.currentUser.orgId)
                            .then(function (res) {
                                vm.userOrgInfo = res.data;
                                if (vm.userOrgInfo.status === 'NoStatus')
                                    $location.url("/OrgNotYetApproved");
                                else if (vm.userOrgInfo.status === 'Rejected')
                                    $location.url("/OrgRejected");
                            })
                    })
            }

            FormService.findFormsInActive()
                .then(function (response) {
                    console.log(response.data)
                    vm.prevSemData=response.data
                    var q=0;
                    for(var p in vm.prevSemData)
                    {

                        UserService.findUserById(vm.prevSemData[p].userId)
                            .then(
                                function (res) {
                                    vm.prevSemData[q].userName=res.data.firstName+" "+res.data.lastName;
                                    q++
                                },function (err) {
                                    console.log(err)
                                }
                            )

                    }
                },function (err) {
                    console.log(err)
                })

                FormService.findFormsActive()
                    .then(
                        function (response) {
                            vm.currentSemData=response.data;
                            var q=0
                            for(var p in vm.currentSemData)
                            {

                                UserService.findUserById(vm.currentSemData[p].userId)
                                    .then(
                                        function (res) {
                                            vm.currentSemData[q].userName=res.data.firstName+" "+res.data.lastName;
                                            q++
                                        },function (err) {
                                            console.log(err)
                                        }
                                    )

                            }

                        },
                        function (err) {
                            console.log(err)
                        }
                    );

            vm.message ="";
            UserService.getAllOppInfo(vm.currentuser).then(function(user){
                    console.log("returned from adding Opportunity ..",user.data);
                    for (var g = 0; g< user.data.length ;g ++) {
                        var oppInfoArrNew = user.data[g].opportunities;
                        vm.oppInfoArr = vm.oppInfoArr.concat(oppInfoArrNew);
                    }
                },function(err){
                    console.log(err);
                }

            );

            a();

        }init();



        function deleteFormById(id) {
            FormService.deleteFormById(id)
                .then(function (response) {
                    console.log(response.data)
                    vm.form=response.data;
                    vm.fields=vm.form.fields
                    $route.reload();
                },function (err) {
                    console.log(err)
                })
        }


        function saveFormInProgress(form) {
            // form.state="Submitted";
            console.log(form)
            FormService.updateFormObject(form)
                .then(function (response) {
                    console.log(response.data)
                    $window.location.reload();
                },function (err) {
                    console.log(err)
                })
        }

        function saveForm(form) {
            form.state="Submitted";
            console.log(form)
            FormService.updateFormObject(form)
                .then(function (response) {
                    console.log(response.data)
                    $window.location.reload();
                },function (err) {
                    console.log(err)
                })
        }

        function findFormById(id) {
            FormService.findFormById(id)
                .then(function (response) {
                    console.log(response.data)
                    vm.form=response.data;
                    vm.fields=vm.form.fields
                },function (err) {
                    console.log(err)
                })
        }



        function a() {
            console.log(vm.currentSemData.length)
        }
        function getOrgId() {
            PartnerOrgInfoService.getPartnerId($rootScope.currentUser._id)
                .then(
                    function (response) {
                        console.log(response.data[0].orgId)
                       vm.orgId=response.data[0].orgId;
                    }, function (err) {
                        console.log(err)
                    }
                )
        }getOrgId();



        
        function commitSubmit(form,fields) {
            var fieldsIds=[]
            var count=0;
            // console.log(form)
            delete form._id;
            form.fields=[];
            // console.log($rootScope.currentUser._id)
            form.userId=$rootScope.currentUser._id
            form.state="Submitted";
            form.type="Partner";
            form.orgId=vm.orgId;
            // console.log(form.orgId)

            // console.log(form)
            FormService.PartnerCreateForm(form)
                .then(function (response) {
                    // console.log(response.data)
                    var formId=response.data._id;

                    for(var i in fields)
                    {
                        count++;
                        delete fields[i]._id;
                        fields[i].position=i;
                        if(fields[i].type==="RADIOS")
                        {
                            console.log(fields[i].selected)
                        }

                        FieldService.partnerCreateField(formId,fields[i])
                            .then(function (response) {
                                // console.log(response.data)
                            },function (err) {
                                // sleep(1000)
                                console.log(err)
                            })
                    } //deleted _id from all fields

                    // console.log(count)

                    $window.location.reload();
                },function (err) {
                    console.log(err)
                })





        }


        function commitSave(form,fields) {
            var fieldsIds=[]
            var count=0;

            // console.log(form)
            delete form._id;
            form.fields=[];
            console.log($rootScope.currentUser._id)
            form.userId=$rootScope.currentUser._id
            form.state="InProgress";
            form.type="Partner";
            form.orgId=vm.orgId
            console.log(form.orgId)

            FormService.PartnerCreateForm(form)
                .then(function (response) {
                    console.log(response.data)
                    var formId=response.data._id;

                    for(var i in fields)
                    {

                        count++;
                        delete fields[i]._id
                        fields[i].position=i;
                        // console.log(fields[i].type)
                        FieldService.partnerCreateField(formId,fields[i])
                            .then(function (response) {
                                console.log(response.data)
                            },function (err) {
                                // sleep(1000)
                                console.log(err)
                            })
                    } //deleted _id from all fields

                    // console.log(count)
                    $window.location.reload();

                },function (err) {
                    console.log(err)
                })

        }

        function clone(form,fields) {
            var fieldsIds=[]
            // var count=0;

            // console.log(form)
            delete form._id;
            form.fields=[];
            console.log($rootScope.currentUser._id)
            form.userId=$rootScope.currentUser._id
            form.state="InProgress";
            form.status="Active"
            // form.type="Partner";
            // form.orgId=vm.orgId
            // console.log(form.orgId)

            FormService.PartnerCreateForm(form)
                .then(function (response) {
                    // console.log(response.data)
                    var formId=response.data._id;

                    for(var i in fields)
                    {

                        // count++;
                        delete fields[i]._id
                        // fields[i].position=i;
                        // console.log(fields[i].type)
                        FieldService.partnerCreateField(formId,fields[i])
                            .then(function (response) {
                                console.log(response.data)
                            },function (err) {
                                // sleep(1000)
                                console.log(err)
                            })
                    } //deleted _id from all fields

                    // console.log(count)
                    $window.location.reload();

                },function (err) {
                    console.log(err)
                })

        }

        function startApp(){
            FormService.findAllForms()
                .then(function(userForms){
                    vm.forms = userForms.data;
                    FieldService.findFieldByForm(vm.forms[0]._id)
                        .then(function(response){
                                vm.fields = response.data;
                                console.log("hrrer");
                            },
                            function(err){
                                console.log(err);
                            });
                },function(err){
                    console.log(err);
                });
        }

        function changeView(view) {
            vm.currentView = view;
        }


        function checkOppInfo(oppInfoArr) {
            for (var i = 0 ; i < oppInfoArr.length ; i ++) {

                var oppInfo = oppInfoArr[i];
                if (oppInfo.partnerId === true) {

                    var id = oppInfo._id;
                    PartnerOrgInfoService.getUserOrgId(vm.currentUser).then(function(user){
                            console.log("returned from getUserOrgId ..",user);
                            if (user.data) {
                                OrgInfoService.getOrgById(user.data.orgId).then(function(user){
                                        console.log("returned from getOrgById ..",user);
                                        oppInfo.partnerOrgId  = user.data.name;
                                        oppInfo.partnerId = vm.currentUser.username;
                                        oppInfo.requestedBy = vm.currentUser.username;
                                        oppInfo.status = "requested";
                                        oppInfo._id = id;
                                        UserService.updateOppInfo(oppInfo).then(function(user){
                                            console.log("returned from updateOppInfo ..",user);
                                            vm.message = "Request has been sent to Admin , awaiting approval";

                                        },function(err){
                                            console.log(err);
                                        });

                                    },function(err){
                                        console.log(err);
                                    }

                                );
                            }

                        },function(err){
                            console.log(err);
                        }

                    );
                }

            }

            $timeout( function(){
                UserService.getAllOppInfo(vm.currentUser).then(function(user){
                    console.log("returned from adding Opportunity ..",user.data);
                    vm.oppInfoArr = [];
                    for (var g = 0; g< user.data.length ;g ++) {
                        var oppInfoArrNew = user.data[g].opportunities;
                        vm.oppInfoArr = oppInfoArrNew;
                    }

                },function(err){
                    console.log(err);
                } );
            }, 2000 );



        }

    }
})();