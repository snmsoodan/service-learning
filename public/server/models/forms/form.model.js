var mongoose = require("mongoose");
var q =require("q");

module.exports = function(app){
    var FormSchema = require("./form.schema.server.js")();
    var form = mongoose.model("form",FormSchema);
    var fieldModel = require("./field.model.js")(form);
    require("../../services/field.service.server.js")(app,fieldModel);


    var api = {
        createForm:createForm,
        findFormById:findFormById,
        findFormsByUserId:findFormsByUserId,
        deleteFormById:deleteFormById,
        updateFormById:updateFormById,
        findAllForms:findAllForms,

        findFormsActive:findFormsActive,
        updateFormObject:updateFormObject,

        getAllOrganizationIdApplicationSubmitted:getAllOrganizationIdApplicationSubmitted,
        getAllOrganizationIdApplicationInProgress:getAllOrganizationIdApplicationInProgress,

        getSpecificOrganizationSubmitted:getSpecificOrganizationSubmitted,
        getSpecificOrganizationInProgress:getSpecificOrganizationInProgress,

        PartnerCreateForm:PartnerCreateForm,
        findFormsInActive:findFormsInActive,
        archiveAllForms:archiveAllForms
    };

    return api;

    function archiveAllForms() {
        return form.update({status:"Active",type:"Partner"},{$set:{
            status:"InActive"
        }})
    }

    function findFormsInActive() {
        return form.find({status:"InActive"})
    }

    function getSpecificOrganizationInProgress(pid) {
        return form.find({state:'InProgress',orgId:pid})
    }

    function getAllOrganizationIdApplicationInProgress() {
        return form.find({state:'InProgress',status:"Active"})
    }

    function getSpecificOrganizationSubmitted(pid) {
        return form.find({state:'Submitted',orgId:pid})
    }

    function getAllOrganizationIdApplicationSubmitted() {
        console.log("model")
        return form.find({state:'Submitted',status:"Active"})
    }

    function updateFormObject(newForm) {

        console.log(newForm)
        var deferred = q.defer();
        form.update({_id:newForm._id},{$set:newForm},
            function(err,stats){
                if(!err){
                    // console.log("server pass")
                    deferred.resolve(stats);
                }else{
                    // console.log("server error")
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }

    function findFormsActive() {
        return form.find({"status":"Active","type":"Partner"})
    }


    function PartnerCreateForm(newform) {
        return form.create(newform)
    }

    function createForm(userid,newForm){
        var deferred = q.defer();
        var formObj = {
            "userId": userid,
            "title": newForm.title,
            "status":newForm.status,
            "fields": [],
            "created": new Date(),
            "updated": new Date()
        };
        form.create(formObj,function(err,doc){
            if(err){
                deferred.reject(err);
            }else{
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function findFormById(formId){
        return form.findById(formId);
    }

    function findAllForms() {
        return form.find();
    }


    function findFormsByUserId(userid){
        var deferred = q.defer();
        form.find({userId:userid},
            function(err,forms){
                if(!err){
                    deferred.resolve(forms);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }


    function deleteFormById(formId){
        var deferred = q.defer();
        form.remove({_id:formId},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }
            });
        return deferred.promise;
    }

    function updateFormById(formId,newForm){
        var deferred = q.defer();
        form.update({_id:formId},{$set:newForm},
            function(err,stats){
                if(!err){
                    deferred.resolve(stats);
                }else{
                    deferred.reject(err);
                }
            });
        return deferred.promise;
    }
};