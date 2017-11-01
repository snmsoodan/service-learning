var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");

module.exports = function(app,userModel){

    app.post('/api/login', passport.authenticate('serviceLearning'), login);
    app.post('/api/logout',logout);
    app.get('/api/loggedIn',loggedIn);
    app.post('/api/register',register);


    passport.use('serviceLearning',new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if (user && bcrypt.compareSync(password,user.password))
                    {
                        return done(null, user);
                    }else{
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }

            );
    }
    function serializeUser(user, done) {
        delete user.password;
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findById(user._id)
            .then(
                function(user){
                    delete user.password;
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedIn(req, res) {
        //console.log(req.isAuthenticated() ? req.user : '0');
        //res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req,res) {
        var newUser = req.body;
        console.log("server service"+newUser);

        userModel
            .findUserByEmailId(newUser.emailId)
            .then(function(user) {
                if(user)
                    res.json(null);
                else{
                    newUser.password = bcrypt.hashSync(newUser.password);
                    var result = userModel.createUser(newUser);
                    return result;
                }
            },
            function(err){
                res.status(400).send(err);
            })
            .then(function(user){
                if(user)
                {
                    req.login(user,function(err) {
                        if(err)
                            res.status(400).send(err);
                        else
                            res.json(user);
                    });
                }
            }, function(err) {
                res.status(400).send(err);
            });
    }
};