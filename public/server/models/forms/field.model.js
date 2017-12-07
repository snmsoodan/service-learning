var q =require("q");

module.exports = function(form){

    var api = {
        createField : createField,
        deleteField:deleteField,
        updateField:updateField,
        findField:findField,
        findAllFieldsForForm:findAllFieldsForForm,
        sortField:sortField,

        PartnerCreateField:PartnerCreateField
    };

    return api;

    function PartnerCreateField(formId,newField) {
       return form
           .update({_id:formId},{$addToSet:{
               fields:newField
           }})


    }

    function createField(formId,newField){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    doc.fields.push(newField);
                    form.update({_id:formId},
                        {$set:{
                            fields: doc.fields,
                            updated:new Date()
                        }},
                        function (err,response) {
                            if (err) {
                                deferred.reject(err);
                            } else {
                                deferred.resolve(response);
                            }
                        });
                }
            });

        return deferred.promise;
    }

    function  deleteField(formId,fieldId){
        var deferred = q.defer();
        form.findById(formId,
            function (err, response) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = response;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields.splice(u,1);
                            form.update({_id : formId},
                                {$set:{
                                    fields:newForm.fields,
                                    updated:new Date()
                                }},
                                function (err,doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(doc);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function  updateField(formId,fieldId,field){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    var newForm = doc;
                    for(var u in newForm.fields){
                        if(newForm.fields[u]._id == fieldId){
                            newForm.fields[u] = field;
                            form.update({_id : formId},
                                {$set: {fields: newForm.fields,
                                    updated:new Date()}},
                                function (err, doc) {
                                    if (err) {
                                        deferred.reject(err);
                                    } else {
                                        deferred.resolve(field);
                                    }
                                });
                        }
                    }
                }
            });
        return deferred.promise;
    }

    function findField(formId,fieldId){
        var deferred = q.defer();

        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {

                    var fields = doc.fields;
                    for(var u in fields){
                        if(fields[u]._id == fieldId){
                            deferred.resolve(fields[u]);
                        }
                    }
                }
            });
        return deferred.promise;
    }


    function findAllFieldsForForm(formId){
        var deferred = q.defer();
        form.findById(formId,
            function (err, doc) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(doc.fields);
                }
            });

        return deferred.promise;
    }

    function sortField(formId,startIndex,endIndex){
        var deferred = q.defer();

        form.findById(formId,
            function(err,doc){
                if(err){
                    deferred.reject(err);
                }else{
                    var userForm = doc;
                    userForm.fields.splice(endIndex,0,userForm.fields.splice(startIndex,1)[0]);
                    form.update(
                        {"_id":formId},
                        {$set:{"fields":userForm.fields}},
                        function(err,doc){
                            if(err){
                                deferred.reject(err);
                            } else{
                                deferred.resolve(doc);
                            }
                        });
                }
            });
        return deferred.promise;
    }
};