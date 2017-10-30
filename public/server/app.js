module.exports = function (app) {
    /* passing the instance app and immediately calling it*/
    // we are pasbsing app and models to the services
    // instantiate them from

    var models = require("../model/models.server.js")();
    require("../model/user.service.server.js")(app, models);
    // pas the models to services.
    //require("./services/user.service.server.js")(app, models);
    // require("./services/website.services.server.js")(app, models);
    // require("./services/page.services.server.js")(app, models);
    // require("./services/widget.services.server.js")(app, models);
//     var employeeDataArr = [];
//     var MongoClient = require('mongodb').MongoClient
//         , assert = require('assert');
//
//     // Connection URL
//     var url = 'mongodb://localhost:27017/serviceLearning';
// // Use connect method to connect to the Server
//     MongoClient.connect(url, function(err, db) {
//         assert.equal(null, err);
//         console.log("Connected correctly to server");
//         var cursor = db.collection('EmployeeInfo').find();
//         cursor.each(function(err, doc) {
//             console.log('-came to user Model employeeDataArr --test data '+JSON.stringify(doc));
//             if (doc != null && JSON.stringify(doc) != null) {
//                 employeeDataArr.push(doc);
//             }
//         });
//         console.log('---employeeDataArr---'+employeeDataArr);
//         db.close();
//         console.log('---returning json-');
//         //res.json([{"userName":"1234"}]);
//         //return employeeDataArr;
//     });

    app.get("/say/:something", function(req, res){
        var msg = req.params['something'];
        res.send({message: msg});
    });


};