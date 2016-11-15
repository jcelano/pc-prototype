'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("StudyCrudController",
    ['$uibModalInstance', '$scope', 'ClientService', 'StudyService', 'client','drug', 'study',
    function ($uibModalInstance, $scope, ClientService, StudyService, client, drug, study) {
        $scope.is_new = false;
        $scope.client = client;
        $scope.drug = drug;

        if (study != null && study.id != null) {
            $scope.study = study;
        }
        else {
            $scope.study = StudyService.newInstance();
            $scope.is_new = true;

        }

        $scope.handleDeleteStudy = function () {

            ClientService.deleteStudyFromDrug($scope.client.id, $scope.drug.id, $scope.study.id);

            $uibModalInstance.dismiss('cancel');
        };

        $scope.handleAddStudy = function () {

            if ($scope.is_new) {
                ClientService.addStudyToDrug($scope.client.id, $scope.drug.id, $scope.study);
            }
            else{
                //this was just an update, so it should be all set
                ClientService.saveState();
            }

            $uibModalInstance.close($scope.study);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]).directive('studyId', ['ClientService', function(ClientService) {
    return {

        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if(ClientService.getStudyByDrugById(scope.client.id, scope.drug.id, ngModelValue)){
                    ctrl.$setValidity('idExistsValidator', false);
                }
                else{
                    ctrl.$setValidity('idExistsValidator', true);
                }
                return ngModelValue;
            }
            ctrl.$parsers.push(customValidator);
        }
    };
}]);