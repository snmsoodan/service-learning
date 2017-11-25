(function() {
    "use strict";

    angular.module("ServiceLearningApp")
        .factory("FormService",FormService);

    function FormService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById,
            findFormById:findFormById,
            findAllForms:findAllForms
        };

        return api;

        function createFormForUser(userId,newForm) {
            return $http.post("/api/user/" +userId+ "/form",newForm);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/userForms/" +userId+ "/form");
        }

        function findAllForms() {
            return $http.get("/api/allForms");
        }

        function deleteFormById(formId) {
            return $http.delete("/api/form/" +formId);
        }

        function updateFormById(formId, newForm) {
            return $http.put("/api/form/" +formId, newForm);
        }

        function findFormById(formId){
            return $http.get("/api/form/" +formId);
        }
    }
})();
