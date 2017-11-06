module.exports = function(app){

    var userModel = require("./models/user/user.model.js")(app);
    var partnerOrgInfoModel = require("./models/partnerOrgInfo/partnerOrgInfo.model.js")(app);
    var applicationInfoModel=require("./models/applicationInfo/applicationInfo.model")(app);
    var organizationInfoModel=require("./models/organizationInfo/organizationInfo.model")(app);

    require("./services/user.service.server.js")(app,userModel);
    require("./services/partnerOrgInfo.service.server.js")(app,partnerOrgInfoModel);
    require("./services/applicationInfo.service.server.js")(app,applicationInfoModel);
    require("./services/organizationInfo.service.server.js")(app,organizationInfoModel);

};