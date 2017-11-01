
/* unlike angular, if w e ask by name, we cant get it */
// we are passing models
/*module.exports= function(app, models){

   var userModel = models.userModel;
    var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
    var url = 'mongodb://localhost:27017/serviceLearning';
    /* John pappy's - declare APIs at top and write functions below */

    /*app.post("/api/user", createUser);
    app.post("/api/register", register);
    app.get("/api/user", getUsers);
    app.get("/api/loggedIn",loggedIn);
    app.post("/api/logout", logout);
    app.post('/api/login',login);//created afer introduction of sessions/passport
    app.get("/api/user/:userId", findUserById);
    app.delete("/api/user/:userId", deleteUser);
    app.put("/api/user/:userId", updateUser);
    app.post('/api/getAllUsers',getAllUsers);
    app.post('/api/getRegisterReject',getRegisterReject);
    app.post('/api/createData',createData);

    /* pattern matching usies only base URL. it ignores anything after ?
     app.get("/api/user/:userId", findUserById);
     app.get("/api/user/:userId", findUserById);
     are the same URLs to Express!     */

    // has a unique token, has profile also
    // profile has the info about user
    // refresh toke - hashes info in db. makes sure the user
    // done is simlar to that of local strategy.
    // we need to call done with instance of an object that represents a user

    /*function register(req,res) {
        var username = req.body.params.name;
        var registrationObject = JSON.parse(JSON.stringify(username));
        console.log('converted Ibj = '+registrationObject);
        var userExist = false;
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            var cursor = db.collection('EmployeeInfo').find();
            var documentLength =0;
            cursor.each(function(err, doc) {
                //console.log('---test data if the USername is there .. '+JSON.stringify(doc));
                if(JSON.stringify(doc) != null) {
                    var registredUsers = JSON.parse(JSON.stringify(username));
                    for (var obj=0;obj<registredUsers.length;obj++) {
                        if (registredUsers[obj].username === registrationObject.username) {
                            userExist = true;
                        }
                        documentLength++;
                    }
                }
            });
            var empId = documentLength+1;
            if (!userExist) {
                db.collection('EmployeeInfo').insertOne({
                    employeeid: empId,
                    firstname : registrationObject.firstname,
                    lastname : registrationObject.lastname,
                    password : registrationObject.password,
                    username : registrationObject.username,
                    role : registrationObject.role,
                    status : "P",
                    reason: registrationObject.reason,
                    createdDate : new Date(Date.now()).toISOString(),
                    updatedBy : "",
                    updatedDate : ""
                });
                res.json({note:'User registration successful, kindly try logging in after some time'});
            } else {
                res.json({note:'User already Exists , try another email'});
            }
            db.close();
        });

    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {

                if(user && user.password){
                    done(null, user);
                }else {
                     done(null, "Error in the login");
                  }
                },
                function(err) {
                    done(err);
                });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {

        userModel

            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function login ( req, res){
        var username = req.body.username;
        var password = req.body.password;
        var userDetailsObj = {};
        MongoClient.connect(url, function(err, db) {
            db.collection('EmployeeInfo').findOne({
                username: username,
                password: password
            }, function (err, doc) {
                userDetailsObj = doc;
                res.json(userDetailsObj);
                db.close();
            });
        });
    }

    function getAllUsers(req, res) {
        var MongoClient = require('mongodb').MongoClient
            , assert = require('assert');
        var employeeDataArr = [];
        var url = 'mongodb://localhost:27017/serviceLearning';
        MongoClient.connect(url, function(err, db) {
            console.log("Connected correctly to server");
            var collection = db.collection('UserInfo');
            collection.find({status: "P"}).toArray(function(err, items) {
                if (err) {
                    console.log('err'+err);
                } else {
                    res.json(items);
                }
            });
        });
    }

    function getRegisterReject(req, res) {
            MongoClient.connect(url, function(err, db) {
                var username = req.body.params.name;
                var regUpdObject = JSON.parse(username);
                console.log('--updating the Status with A for the Object'+regUpdObject['employeeid']);
                var id = {
                    _id: regUpdObject._id
                };
                var collection = db.collection('UserInfo');
                collection.findOneAndUpdate(
                    {"username" :regUpdObject.username},
                    {$set:{"status" : regUpdObject.status,"updatedDate" : new Date(Date.now()).toISOString()}}//change as needed

                );
                if (regUpdObject.status === 'A') {
                    res.json({note:'User has been Activated successfully'});
                } else {
                    res.json({note:'User has been Rejected successfully'});
                }
            });
    }

    function createData(req, res) {
        var username = req.body.params;

        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");

            var cursor = db.collection('Employee').find();

            cursor.each(function(err, doc) {

                db.collection('UserInfo').insert([{
                    Employeeid: 1,
                    EmployeeName: "parashar",
                    firstName : "parashar",
                    lastName : "parashar",
                    username : "parashar@gmail.com",
                    email : "parashar@gmail.com",
                    password: "parashar123",
                    role : "ADMIN",
                    status : "A",
                    createdDate: new Date(Date.now()).toISOString()
                },{
                    Employeeid: 2,
                    EmployeeName: "carl",
                    firstName : "carl",
                    lastName : "carl",
                    username : "carl@gmail.com",
                    email : "carl@gmail.com",
                    password: "carl123",
                    role : "ADMIN",
                    status : "A",
                    createdDate: new Date(Date.now()).toISOString()
                },{
                    Employeeid: 3,
                    EmployeeName: "dean",
                    firstName : "dean",
                    lastName : "dean",
                    username : "dean@gmail.com",
                    password: "dean123",
                    email : "dean@gmail.com",
                    role : "PARTNER",
                    status : "A",
                    createdDate: new Date(Date.now()).toISOString()
                },{
                    Employeeid: 4,
                    EmployeeName: "bob",
                    firstName : "bob",
                    lastName : "bob",
                    email : "bob@gmail.com",
                    password: "bob123",
                    role : "FACULTY",
                    status : "A",
                    createdDate: new Date(Date.now()).toISOString(),
                }]);

            });
            res.json({note:'Data has been successfully inserted'});
        });

    }


    function logout(req, res) {
        //we're using function provided by passport
        req.logout();
        res.send(200); //success
    }

    function loggedIn(req,res) {
        //function given by passport
        if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send('0');
        }
    }

    function createUser(req,res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(
                function(user){

                    res.json(user);
                },
                function(error){
                    res.statusCode(400).send(error);
                }
            )
        // for (var i in users){
        //     if (users[i].username === user.username){
        //         var err = "dupuid";
        //         res.send(err);
        //
        //         //return "yes";
        //     }
        // }
        // if(user.password === user.vpassword){
        //
        //     //     user._id = (new Date()).getTime() + "";
        //     //
        //     // users.push(user);
        //     // res.send(user);
        // }
        // var err = "uepw";
        // res.send(err);
    }



    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            //responds with some stats
            .then(function (stats) {

                res.send(200);
            },
            function (error) {
                res.statusCode(404).send(error);
            });

        // for(var i in users){
        //     if(users[i]._id===userId){
        //         users.splice(i,1);
        //          console.log("deleted user");
        //         res.send(200); /* 200 - OK */
        //         return;
        //     }
        // }
        // res.send(400);
    }

    /*function updateUser(req,res) {


        var userId = req.params.userId;
        var user = req.body;

        userModel
            .updateUser(userId, user)
            .then(function (stats) {

                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

        // for (var i in users){
        //     if(users[i]._id === userId){
        //         users[i].firstName = user.firstName;
        //         users[i].lastName = user.lastName;
        //         users[i].email = user.email;
        //         res.send(200);
        //     }
        // }
        // res.send(400);
    }

     function findUserById(req, res){
         var id = req.params.userId;

         userModel
             .findUserById(id)
             .then(function (user) {
                 res.send(user);
             },
             function (error) {
                 res.statusCode(404).send(error);
             });
        // for (var i in users){
        //     if(users[i]._id === id){
        //         res.send(users[i]);
        //         return;
        //     }
        // } res.send({});
    }

    function getUsers(req, res){
        var username = req.query['username'];
        var password= req.query['password'];
 
        if(username && password){
            findUserByCredentials(username,password, req, res);
        } else if (username){
            findUserByUsername(username, res);
        }else {
            res.send(users);
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                req.session.currentUser= user;
                res.json(user);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
      //   for (var i in users){
      //       if(users[i].username === username &&
      //           users[i].password === password){
      //           res.send(users[i]);
      //           return;
      //       }
      //   }
      // //  res.send({});
      //   var user = generateError(username, password);
      //   res.send(user);
    }

    function findUserByUsername (username, res){
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            },
            function (err) {
                res.statusCode(404).send(err);
            });
        // for (var i in users){
        //     if(users[i].username === username){
        //         res.send(users[i]);
        //         return;
        //     }
        // }
        //
        // var errMsg = generateError(username, password);
        // console.log(errMsg);
        // res.send(errMsg);
    }



    /* helper functions */
    /*function generateError(username, password) {

        for(var i in users){
            if(users[i].username === username &&
                users[i].password !== password) {
                return "Wrong Password. Wake Up!";
            }
        } return "Username doesn't exist !!!";

    }

    function getRegisterError(user){
        for(var i in users){
            if (users[i].username === user.username){
                return "Username is already chosen. Either be creative or forget this.";

            }

        }
        return "the passwords do not match! Wake up";
    }

};*/