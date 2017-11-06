module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var ApplicationInfoSchema = mongoose.Schema ({
        Desc : String,
        organizationId : String,
        userId : String,
        createdBy : String,
        lastEditedBy : String,
        editedAt : String,
        status : {type: String,
                  enum: ['Submitted','InProgress']}

    }, {collection: "applicationInfo"});

    return ApplicationInfoSchema;
};