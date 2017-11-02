module.exports = function(app){

    var userModel = require("./models/user/user.model.js")(app);
    var partnerOrgInfoModel = require("./models/partnerOrgInfo/partnerOrgInfo.model.js")(app);

    require("./services/user.service.server.js")(app,userModel);
    require("./services/partnerOrgInfo.service.server.js")(app,partnerOrgInfoModel);

};