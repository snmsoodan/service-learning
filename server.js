var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var connectionString = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/serviceLearning';

var db = mongoose.connect(connectionString);
// var ipaddress = '127.0.0.1';

//app.use(express.static(__dirname + '/public'));

app.use(passport.initialize());
app.use(passport.session());
require("./public/server/app.js")(app);
app.listen(port);
