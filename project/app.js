module.exports=function (app) {

    // var mongoose = require('mongoose');
    // mongoose.connect('mongodb://localhost/fall');

    var models=require("./models/models.server.js")();
    require("./services/user.service.server.js")(app,models);
};