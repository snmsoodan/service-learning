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
                templateUrl: "client/views/faculty/facultyProfile.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .when("/faculty/:fid/facultyRequestForMoreJobs", {
                templateUrl: "client/views/faculty/facultyRequestForMoreJobs.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "home"
            });


            }

})();