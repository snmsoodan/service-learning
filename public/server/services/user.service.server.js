module.exports = function(app,userModel) {

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");

    var auth = authorized;
    app.post('/api/login', passport.authenticate('local'), login);
    app.post('/api/logout', logout);
    app.get('/api/loggedIn', loggedIn);
    app.post('/api/register', register);
    app.post('/api/getRegisterReject',activateRejectUser);
    app.post('/api/getAllUsers',fetchUser);
    app.post('/api/findUser',findUser);
    app.post('/api/updateUser',updateUser);
    app.post('/api/deleteUser',deleteUser);
    app.post('/api/fetchAll',fetchAll);

    passport.use('local', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
        userModel
            .findUserByUserName(username)
            .then(
                function (user) {
                    if (user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
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
                function (user) {
                    delete user.password;
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function login(req, res) {
        var user = req.user;
        delete user.password;
        res.json(user);
    }

    function loggedIn(req, res) {
        //console.log(req.isAuthenticated() ? req.user : '0');
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register(req,res) {
        var newUser = req.body;

        userModel
            .findUserByUserName(newUser.username)
            .then(function (user) {
                    if (user)
                        res.status(400).send("email already exists");
                    else {
                        newUser.password = bcrypt.hashSync(newUser.password);
                        return userModel.createUser(newUser);
                    }
                },
                function (err) {
                    res.status(400).send(err);
                })
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err)
                            res.status(400).send(err);
                        else
                            res.json(user);
                    });
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function activateRejectUser(req,res) {
        var newUser = req.body;

        userModel
            .findUserByUserName(newUser.username)
            .then(function (obj) {
                    userModel.updateUser(newUser).then(
                        function(success) {
                            console.log('---updateOne---'+obj+' ---- updated user = '+success);
                            res.json(obj);
                        } , function(err) {
                            res.status(400).send(err);
                        });
                },
                function (err) {
                    console.log('---err---'+err);
                    res.status(400).send(err);
                });
    }

    function fetchUser(req,res) {
        var newUser = req.body;
        userModel.fetchUser(newUser.status).then(function (obj) {
            res.json(obj);
        } , function(err) {
            res.status(400).send(err);
        });

    }

    function findUser(req,res) {
        var newUser = req.body;
        userModel
            .findUserByUserName(newUser.username)
            .then(function (obj) {
                    console.log('---findUser---'+obj);
                    res.json(obj);
                },
                function (err) {
                    console.log('---err---'+err);
                    res.status(400).send(err);
                });
    }

    function updateUser(req,res) {
        var newUser = req.body;
        console.log('----In updateUser = '+newUser._id);
        newUser.password = bcrypt.hashSync(newUser.password);
        userModel.updateUserPwd(newUser).then(
            function(success) {
                console.log('---updateOne---'+success+' ---- updated user = '+success);
                res.json(success);
            } , function(err) {
                res.status(400).send(err);
            });
    }

    function deleteUser(req,res) {
        var newUser = req.body;
        console.log('----In deleteUser = '+newUser._id);
        userModel.deleteUser(newUser).then(
            function(success) {
                console.log('---Delete---'+success+' ---- deleted user = '+success);
                res.json(success);
            } , function(err) {
                res.status(400).send(err);
            });
    }


    function fetchAll(req,res) {
        var newUser = req.body;
        userModel.fetchAll().then(function (obj) {
            res.json(obj);
        } , function(err) {
            res.status(400).send(err);
        });

    }



};

