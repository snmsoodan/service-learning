(function(){
    "use strict";
    angular.module("ServiceLearningApp")
        .factory("FieldService",FieldService);

    function FieldService($http){

        var api = {
            createField:createField,
            findField:findField,
            findFieldByForm:findFieldByForm,
            deleteField:deleteField,
            updateField:updateField,
            sortField:sortField,

            partnerCreateField:partnerCreateField
        };

        return api;

        function partnerCreateField(formId,field) {
            return $http.post("/api/field/partnerCreate/"+formId, field);
        }

        function sortField(formId,startIndex,endIndex){
            return $http.put("/api/"+formId+"/field?startIndex="+startIndex+"&endIndex="+endIndex);
        }

        function createField (formId, field) {
            return $http.post("/api/form/" +formId+ "/field", field);
        }

        function findField (formId, fieldId) {
            return $http.get("/api/form/" +formId+ "/field/" + fieldId);
        }

        function findFieldByForm (formId) {
            return $http.get("/api/form/" +formId+ "/field")
        }

        function deleteField (formId, fieldId) {
            return $http.delete("/api/form/" +formId+ "/field/" +fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/form/" +formId+ "/field/" + fieldId, field);
        }

    }
})();