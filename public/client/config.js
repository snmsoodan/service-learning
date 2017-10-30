(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .config(Configure);


    function Configure($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            .when("/login", {
                    templateUrl: "client/views/login/login.view.html",
                    controller: "LoginController",
                    controllerAs: "model"
                })
            .when("/register", {
                templateUrl: "client/views/register/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            //admin start
            .when("/admin/:aid", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })

            //start admin partner proposals
            .when("/admin/:aid/adminPartnerAllProposals", {
                templateUrl: "client/views/admin/adminPartnerAllProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })

            .when("/admin/:aid/adminPartnerList", {
                templateUrl: "client/views/admin/partnerList.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerList/:pid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposal.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerList/:pid/proposal/:prid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalView.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })

            .when("/admin/:aid/adminPartnerListInProgress", {
                templateUrl: "client/views/admin/partnerListInProgress.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerListInProgress/:pid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalInProgress.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerListInProgress/:pid/proposal/:prid", {
                templateUrl: "client/views/admin/adminPartnerSpecificProposalViewInProgress.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })



            // end admin partner proposals




            //admin end
            .when("/partner", {
                templateUrl: "client/views/partner/partner.view.html",
                controller: "PartnerController",
                controllerAs: "model"
            })

            //faculty start
            .when("/faculty/:fid", {
                templateUrl: "client/views/faculty/faculty.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultyProfile", {
                templateUrl: "client/views/faculty/faculty.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultySuggestedJobs", {
                templateUrl: "client/views/faculty/facultySuggestedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultyAcceptedJobs", {
                templateUrl: "client/views/faculty/facultyAcceptedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultyRejectedJobs", {
                templateUrl: "client/views/faculty/facultyRejectedJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultyAllJobs", {
                templateUrl: "client/views/faculty/facultyAllJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "login"
            });


            }

})();