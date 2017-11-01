module.exports = function () {
    var mongoose = require("mongoose"); // mongoDb has no notion of schemas. this is at the application level

    var PartnerOrgInfoSchema = mongoose.Schema ({

        userId: String,
        organizationId: String

    }, {collection: "PartnerOrgInfo"});

    return PartnerOrgInfoSchema;
};