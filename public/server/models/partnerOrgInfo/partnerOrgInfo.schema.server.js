module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var PartnerOrgInfoSchema = mongoose.Schema ({

        userId: String,
        orgId: String

    }, {collection: "PartnerOrgInfo"});
    return PartnerOrgInfoSchema;
};