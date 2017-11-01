module.exports = function(app,db){
    var userModel = require("./models/user/user.model.js")(app,db);
    var partnerOrgInfoModel = require("./models/partnerOrgInfo/partnerOrgInfo.model.js")(app,db);

    var userService = require("./services/user.service.server.js")(app,userModel);
    var partnerOrgInfoService = require("./services/partnerOrgInfo.service.server.js")(app,partnerOrgInfoModel);

};