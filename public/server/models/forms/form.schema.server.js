var mongoose = require("mongoose");
var FieldSchema = require("./field.schema.server.js")();

module.exports = function () {
    var FormSchema = mongoose.Schema({
        userId:String,
        title:{type:String,default:"New Form"},
        status:{type: String,
            enum: ['Active','InActive']},
        state:{type: String,
            enum: ['InProgress','Submitted']},
        type:{type: String,
            enum: ['Partner','Admin']},
        fields:[FieldSchema],
        created:{type:Date,default:new Date()},
        updated:{type:Date,default:new Date()}
    },{collection:'form'});
    return FormSchema;
};