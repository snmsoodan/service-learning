(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .config(Configure);


    function Configure($routeProvider,$locationProvider) {
        $locationProvider.hashPrefix('');

        $routeProvider

            .when("/home", {
                templateUrl: "client/views/home/home.view.html"
            })

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
            //start admin partner list
            .when("/admin/:aid/partnerList", {
                templateUrl: "client/views/admin/partnerList.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid", {
                templateUrl: "client/views/admin/partnerDetails.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid/allProposals", {
                templateUrl: "client/views/admin/partnerSpecificAllProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid/acceptedProposals", {
                templateUrl: "client/views/admin/partnerSpecificAcceptedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid/rejectedProposals", {
                templateUrl: "client/views/admin/partnerSpecificRejectedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid/newProposals", {
                templateUrl: "client/views/admin/partnerSpecificNewProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/partnerDetail/:pid/createNewProposals", {
                templateUrl: "client/views/admin/partnerSpecificCreateNewProposal.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            //end admin partner list

            //start admin partner proposals
            .when("/admin/:aid/adminPartnerAllProposals", {
                templateUrl: "client/views/admin/adminPartnerAllProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerAcceptedProposals", {
                templateUrl: "client/views/admin/adminPartnerAcceptedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerRejectedProposals", {
                templateUrl: "client/views/admin/adminPartnerRejectedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminPartnerNewProposals", {
                templateUrl: "client/views/admin/adminPartnerNewProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            // end admin partner proposals
            .when("/admin/:aid/adminProposalDetailsEdit/:pid", {
                templateUrl: "client/views/admin/adminProposalDetailsEdit.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/adminProposalDetailsNew/:pid", {
                templateUrl: "client/views/admin/adminProposalDetailsNew.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })

                //admin faculty list view
            .when("/admin/:aid/facultyList", {
                templateUrl: "client/views/admin/facultyList.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })

            .when("/admin/:aid/facultyDetail/:pid", {
                templateUrl: "client/views/admin/facultyDetails.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })


            .when("/admin/:aid/facultyDetail/:fid/allProposals", {
                templateUrl: "client/views/admin/facultySpecificAllProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/facultyDetail/:fid/acceptedProposals", {
                templateUrl: "client/views/admin/facultySpecificAcceptedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/facultyDetail/:fid/rejectedProposals", {
                templateUrl: "client/views/admin/facultySpecificRejectedProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/admin/:aid/facultyDetail/:fid/newProposals", {
                templateUrl: "client/views/admin/facultySpecificNewProposals.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
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
                redirectTo: "home"
            });


            }

})();