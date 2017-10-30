// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
//
// var FacebookStrategy = require('passport-facebook').Strategy;
// var bcrypt = require("bcrypt-nodejs");

module.exports=function (app,models) {
    var userModel=models.userModel;
    var users=[
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ]

    app.get("/api/user",getUsers);
    app.get("/api/user/:userId",findUserById);
    app.post("/api/user",createUser);
    app.put("/api/user/:userId",updateUser);
    app.delete("/api/user/:userId",deleteUser);

    // app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout",logout);
    app.post("/api/register",register);
    // app.get("/api/loggedIn",loggedIn);









    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.status(400).send("username already in use");
                        return;
                    }else{

                        req.body.password = bcrypt.hashSync(req.body.password);
                        return  userModel
                            .createUser(req.body)
                    }
                },
                function (error) {
                    res.status(400).send(error);
                })
            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.status(400).send(err);
                            }
                            else{
                                res.json(user);
                            }
                        });
                    }
                },
                function (error) {
                    res.status(400).send(error);
                }
            )


    }



    function logout(req,res) {
        req.logOut();
        res.send(200);
    }
    function login(req,res) {
        console.log("login service")
        var user=req.user;
        console.log(user)
        res.json(user);
    }



    function deleteUser(req,res) {
        var id=req.params.userId;
        userModel
            .deleteUser(id)
            .then(function (stat) {
                console.log(stat);
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })

    }

    function updateUser(req,res) {
        var newUser=req.body;
        var id=req.params.userId;

        userModel
            .updateUser(id,newUser)
            .then(function (status) {
                res.send(200);
            },function (error) {
                res.statusCode(404).send(error);
            })


    }
    
    
    function createUser(req,res) {
        var user=req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            },function (error) {
                res.statusCode(400).send(error);
            })

    }

    function getUsers(req,res) {
        var username=req.query.username;
        var password=req.query.password;
        if(username&&password){
            findUserByCredentials(username,password,req,res);
        }
        else if(username){
            findUserByUsername(username,res);
        }
        else {
            res.send(users);
        }
    }
    function findUserById(req,res) {
        var id=req.params.userId;
        userModel
            .findUserById(id)
            .then(function (user) {
                res.send(user);
            },function (error) {
                res.statusCode(404).send(error);
            })


    }

    function findUserByCredentials(username,password,req,res) {

        userModel
            .findUserByCredentials(username,password)
            .then(function (user) {
                console.log(req.session);
                req.session.currentUser=user;
                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })
    }

    function findUserByUsername(username,res) {

        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },function (error) {
                res.statusCode(404).send(error);
            })

    }
};