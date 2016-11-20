'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("ClientCrudController", ['$uibModalInstance', '$scope', 'ClientService', 'client', function($uibModalInstance, $scope, ClientService, client) {
    $scope.is_new = false;
    if(client != null && client.id != null){
        $scope.client = client;
    }
    else{
        $scope.client = ClientService.newInstance();
        $scope.is_new = true;

    }

    $scope.clientIdExists = function(id){
        return ClientService.getClientById(id) != null;
    };

    $scope.handleDeleteClient = function () {
        ClientService.deleteClient($scope.client.id);
        $uibModalInstance.dismiss('cancel');
    };

    $scope.handleAddClient = function () {

        if($scope.is_new){
            ClientService.addClient($scope.client);
        }
        else{
            ClientService.saveState();
        }

        $uibModalInstance.close($scope.client);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]).directive('clientId', ['ClientService', function(ClientService) {
        return {

            // limit usage to argument only
            restrict: 'A',

            // require NgModelController, i.e. require a controller of ngModel directive
            require: 'ngModel',

            // create linking function and pass in our NgModelController as a 4th argument
            link: function(scope, element, attr, ctrl) {
                function customValidator(ngModelValue) {
                    if(ClientService.getClientById(ngModelValue)){
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