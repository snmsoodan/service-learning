(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("RegisterController", RegisterController);

    function RegisterController($rootScope, $location, UserService, PartnerOrgInfoService) {

         var vm = this;
         vm.registerPartner = registerPartner;

         function init(){

         }init();

         function registerPartner(partner) {

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

             if(!partner.emailId){
                 vm.message = "Please enter an email address";
                 return;
             }

             if(!partner.password){
                 vm.message = "Please enter a password";
                 return;
             }

             var newPartner = {
                  firstName: partner.firstName,
                  lastName:partner.lastName,
                  emailId:partner.emailId,
                  password:partner.password,
                  role:"PARTNER"
             };

             UserService.register(newPartner)
                 .then(function(user){
                     console.log("returned from registering partner",user);
                     if(user)
                     {
                         console.log("registered user",user.data);
                         $rootScope.currentUser = newPartner;
                         $rootScope.currentUser.orgId = partner.orgId;

                         var info = {
                             userId : user.id,
                             organizationId : partner.orgId
                         };
                         console.log("partner org info",info);
                         PartnerOrgInfoService.addUserOrgInfo(info)
                             .then(function(res){
                                 if(res)
                                     $location.url("/partner");
                             })
                     }else
                         vm.message = "email id already exists";
                 },
                     function(err){
                        console.log(err);
                     }
                 );

         }
    }
})();