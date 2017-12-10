(function() {
    "use strict";

    angular.module("ServiceLearningApp")
        .controller("FieldController",FieldController);

    function FieldController(FieldService,FormService,$rootScope) {
        var vm = this;

        var formId;
        vm.currentField = null;
        vm.fieldEdit=null;
        vm.commitEdit = commitEdit;
        vm.editField = editField;
        vm.deleteField = deleteField;
        vm.addField=addField;
        vm.repeatField = repeatField;
        vm.sortField = sortField;
        vm.fields = [];
        vm.FormView = FormView;
        vm.viewForm = false;


        var currentUser =$rootScope.currentUser;



        /*function updateForm(start,end){
            var newFields = [];

            for(var i in vm.fields){
                newFields[i] = vm.fields[i];
            }

            var temp = newFields[start];
            newFields[start] = newFields[end];
            newFields[end] = temp;

            FormService.findFormById(formId)
                .then(function(response){
                    var form = response.data;
                    form.fields = newFields;
                    FormService.updateFormById(form._id,form);
                },function(err){
                    console.log(err);
                });


                if($routeParams.formId){
            formId = $routeParams.formId;
            console.log(formId);
        } else if($rootScope.formId){
            formId = $rootScope.formId;
            console.log(formId);
        }
        }*/

        function init(){

            if($rootScope.formId){
                formId = $rootScope.formId;
                console.log(formId);

                FieldService.findFieldByForm(formId)
                    .then(function(response){
                            vm.fields = response.data;
                            console.log("hrrer");
                        },
                        function(err){
                            console.log(err);
                        });

                FormService.findFormById(formId)
                    .then(function(response){
                            vm.form = response.data;
                        },
                        function(err){
                            console.log(err);
                        })
            }
        }init();

        function FormView(){
            vm.viewForm = true;
        }

        function editField(field){
            vm.fieldEdit = field;
            vm.title = field.title;
            vm.subTitle = field.subTitle;
            var optionsString = "";
            var op =field.options;

            if(op){
                var optionList = [];
                for(var u in op){
                    optionList.push(op[u].label+ ":" +op[u].value+ "\n")
                    optionsString = optionsString + (op[u].label + ":" + op[u].value + "\n");
                }
                vm.fieldEdit.options = optionList;
                optionsString = optionsString.substring(0, optionsString.length - 1);
                vm.options = optionsString;
            }
        }

        function commitEdit(){
            console.log("commit edit");
            if(vm.options != null){
                var opt = vm.options.split("\n");
                var optionList =[];

                for(var u in opt){
                    var val = opt[u].split(":");
                    optionList.push({"label":val[0],"value":val[1]});
                }
                vm.fieldEdit.options = optionList;
                console.log(vm.options);
            }

            vm.fieldEdit.subTitle  = vm.subTitle
            vm.fieldEdit.title = vm.title;

            FieldService.updateField(formId,vm.fieldEdit._id,vm.fieldEdit)
                .then(init(),function(err){
                    console.log(err);
                });
            vm.title = null;
            vm.subTitle = null;
            vm.options = null;
        }

        function deleteField(fieldId){
            FieldService.deleteField(formId,fieldId)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function addField(fieldType){
            var field;
            switch(fieldType) {
                case "LABEL":
                    field = {"title": "New Label", "type": "LABEL"};
                    break;
                case "TEXT":
                    field = {"title": "New Text Field", "type": "TEXT","value":""};
                    break;
                case "TEXTAREA":
                    field = {"title": "New Text Field", "type": "TEXTAREA","value":""};
                    break;
                case "CHECKBOXES":
                    field = {
                        "title": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A","selected":"false"},
                            {"label": "Option B", "value": "OPTION_B","selected":"false"},
                            {"label": "Option C", "value": "OPTION_C","selected":"false"}
                        ]
                    };
                    break;
                case "RADIOS":
                    field = {
                        "title": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X","selected":"false"},
                            {"label": "Option Y", "value": "OPTION_Y","selected":"false"},
                            {"label": "Option Z", "value": "OPTION_Z","selected":"false"}
                        ]
                    };
                    break;
            }
            console.log("type:" +fieldType);
            console.log(field);
            FieldService.createField(formId,field)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function repeatField(field){
            delete field._id;
            console.log(field);
            FieldService.createField(formId,field)
                .then(init(),function(err){
                    console.log(err);
                });
        }

        function sortField(start,end){
            FieldService
                .sortField(formId,start,end)
                .then(function(response){
                        vm.fields= response.data;
                    },
                    function(err){
                        console.log(err);
                    });
        }

    }
})();