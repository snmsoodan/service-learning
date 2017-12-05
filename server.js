var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport = require('passport');
var cookieParser  = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');


var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/serviceLearning';

//try file export///
var fs    = require("fs");
///////////////////

var db = mongoose.connect(connectionString);

app.use(session({
    secret: 'serviceLearning',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
require("./public/server/app.js")(app);
app.listen(port);
