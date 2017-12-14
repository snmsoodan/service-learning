//we create a schema

module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level
    var ROLES =  ["Admin", "Partner", "Faculty"];
    var status = ['Approved','NoStatus','Rejected'];

    var UserSchema = mongoose.Schema ({
        firstName : String,
        lastName : String,
        username : {type: String, required: true},
        password : String,
        role :  String,
        createdDate : {type: Date, default : Date.now},
        status : String,
        reason: String,
        reject: Boolean,
        alerts: {
        alertDate:{type: Date, default : Date.now},
        alertBy: String,
            alertText:String,
            alertStatus:String
    },opportunities : [{ userId: String,
            orgId: String,
            createdDate : {type: Date, default : Date.now},
            createdBy : String ,
            adminId : String ,
            partnerId : String ,
            partnerOrgId : String ,
            requestedBy : String ,
            requestedDate : {type: Date},
            approvedBy : String ,
            allocatedTo : String ,
            allocatedDate : {type: Date} ,
            status : String ,
            oppHeader : String ,
            oppBody : String,
            publishTo : String}]
    }, {collection: "UserInfo"});

    return UserSchema;
};