'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("DrugCrudController", ['$uibModalInstance', '$scope', 'ClientService', 'DrugService', 'client', 'drug',
    function ($uibModalInstance, $scope, ClientService, DrugService, client, drug) {
        $scope.is_new = false;
        $scope.client = client;

        if (drug != null && drug.id != null) {
            $scope.drug = drug;
        }
        else {
            $scope.drug = DrugService.newInstance();
            $scope.is_new = true;

        }

        $scope.handleDeleteDrug = function () {

            ClientService.deleteDrugFromClient($scope.client.id, $scope.drug.id);

            $uibModalInstance.dismiss('cancel');
        };

        $scope.handleAddDrug = function () {

            if ($scope.is_new) {
                ClientService.addDrugToClient($scope.client.id, $scope.drug);
            }
            else{
                //this was just an update, so it should be all set
                ClientService.saveState();
            }

            $uibModalInstance.close($scope.drug);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]).directive('drugId', ['ClientService', function(ClientService) {
    return {

        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if(ClientService.getDrugByClientById(scope.client.id, ngModelValue)){
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