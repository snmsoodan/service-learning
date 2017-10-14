(function() {
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("LoginController",LoginController);

    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder", role:"faculty"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley", role:"faculty"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia", role:"admin"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi",role:"partner" }
    ]

    function LoginController($rootScope,$location) {
        var vm = this;
        vm.message = null;
        vm.login = login;

        function init(){

        }init();

        function login(userEmail,password) {

            for (var i in users)
            {
                if(users[i].username===userEmail&&users[i].password===password)
                {
                    if(users[i].role==="faculty")
                    {
                        $location.url("/faculty/"+users[i]._id);
                    }
                }
            }
        }

    }
})();