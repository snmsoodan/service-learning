module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var OrgInfoSchema = mongoose.Schema ({
        name : String,
        address : String,
        website : String,
        mission : String,
        status : {type: String,
                  enum: ['Approved','NoStatus','Rejected']}

    }, {collection: "OrgInfo"});

    return OrgInfoSchema;
};