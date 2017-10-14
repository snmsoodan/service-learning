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
            .when("/admin", {
                templateUrl: "client/views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model"
            })
            .when("/partner", {
                templateUrl: "client/views/partner/partner.view.html",
                controller: "PartnerController",
                controllerAs: "model"
            })

            .when("/faculty/:fid", {
                templateUrl: "client/views/faculty/faculty.view.html",
                controller: "FacultyController",
                controllerAs: "model"
            })

            .otherwise({
                redirectTo: "home"
            });


            }

})();