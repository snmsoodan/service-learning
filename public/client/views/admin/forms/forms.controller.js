(function(){
    "use strict";
    angular.module("ServiceLearningApp")
        .controller("FormController",FormController);

    function FormController(FormService,$rootScope){

        var vm = this;
        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.currentView = 'Forms';
        vm.changeView = changeView;
        vm.forms = [];
        var currentUser = $rootScope.currentUser;
        // console.log(currentUser.data._id)
        vm.form = null;


        function init(){
            console.log("display -forms controller");
            FormService.findAllForms()
                .then(function(userForms){
                    vm.forms = userForms.data;
                },function(err){
                    console.log(err);
                });
        }init();

        function changeView(view,formId) {
            vm.currentView = view;
            $rootScope.formId = formId;
        }

        function addForm(form){ // should make other forms inactive
            if(form.formName !== null){
                console.log("add form - controller");
                console.log(form);
                // var newForm = {"title": form.formName, "status": "Active"};
                var newForm = {"title": form.formName, "status": "Active"};
                // console.log($rootScope.currentUser.data._id)
                FormService.createFormForUser(currentUser.data._id,newForm)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.form.formName = null;
            }else{
                vm.alertMessage = "Please enter a name for the form";
            }
        }

        function updateForm(form){
            if(form.formName != null){
                console.log("update form - controller");
                var updatedForm = {
                    "title":form.formName,
                    "updated":new Date()
                };
                FormService.updateFormById(vm.form._id,updatedForm)
                    .then(init(),function(err){
                        console.log(err);
                    });
                vm.form.formName = null;
            }else{
                vm.alertMessage = "Please select a form to update";
            }
        }

        function deleteForm(index){
            console.log("delete form - controller");
            FormService.deleteFormById(vm.forms[index]._id)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function selectForm(index){
            console.log("select form - controller");
            vm.form = vm.forms[index];
            vm.form.formName = vm.forms[index].title;
        }
    }
})();