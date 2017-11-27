// var nodemailer = require('nodemailer');

// var fs    = require("fs");

(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("TryController",TryController);



    function TryController($rootScope,$location,$routeParams,$scope,$http,OrgInfoService) {
        var vm = this;
        vm.aid = $routeParams.aid;


        vm.sendMail=function () {
            OrgInfoService.sendMail()
                .then(
                    function (response) {
                        console.log(response.data)
                    },function (err) {
                        console.log(err);
                    }
                )
        }


        vm.testExport=function()
        {
            OrgInfoService.testExport()
                .then(
                    function (response) {
                        console.log(response.data)
                    },function (err) {
                        console.log(err);
                    }
                )
        }


    }
})();