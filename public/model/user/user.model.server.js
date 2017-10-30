
// this API for the database
//encapsulate all CRUD operations in this
//Only database operations happen here
module.exports = function () {

    var mongoose = require ("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        deleteUser: deleteUser,
        updateUser: updateUser,
        findUserByUsername: findUserByUsername,
        login: login

    };
    return api;
    //findByID returns just one
    

    function findUserById(userId) {
        return User.findById({_id: userId});
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }

    function updateUser(userId, user) {
        //ignore _id
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {firstName : user.firstName,
                        lastName : user.lastName,
                        email: user.email}}
            );
    }


    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

    //findOne returns only One (first one for multiple results)
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }

    function createUser(user){
       console.log("user.model.server.createUser()");
        console.log(user);
        return  User.create(user);
    }

    function login(user) {
        console.log('----coming to user Console of teh model 1'+JSON.stringify(user));
        console.log('----coming to user Console of teh model 2 '+user.username+'----'+user.password);
       // var userDetailsObj = new User();
   var MongoClient = require('mongodb').MongoClient
        , assert = require('assert');
       var userDetailsObj = new User();
    // Connection URL
    var url = 'mongodb://localhost:27017/serviceLearning';
        MongoClient.connect(url, function(err, db) {
            db.collection('EmployeeInfo').findOne({
                username: user.username,
                password: user.password
            }, function (err, doc) {
                //console.log('-document-' + JSON.stringify(doc));
                userDetailsObj = doc;
                //console.log('----coming to user Console of teh model 3 '+JSON.stringify(userDetailsObj));
                return new User();
                db.close();
            });
        });

        //   return null;
    }




};