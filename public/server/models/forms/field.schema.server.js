var mongoose = require("mongoose");

module.exports = function () {
    var FieldSchema = mongoose.Schema({
        title:String,
        subTitle:String,
        type: {type: String,
               enum: ['LABEL','TEXT','TEXTAREA','RADIOS','CHECKBOXES']},
        options:[{label:String,value:String}]
    });
    return FieldSchema;
};