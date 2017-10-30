module.exports=function () {

    var connectionString = process.env.MONGODB_URI ||'mongodb://127.0.0.1:27017/serviceLearning';
    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var models={
        userModel:require("./user/user.model.server")(),
    };


    return models;
};