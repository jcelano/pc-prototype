'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("ClientCrudController", ['$uibModalInstance', '$scope', 'ClientService', 'client', function($uibModalInstance, $scope, ClientService, client) {
    $scope.is_new = false;
    if(client != null && client.id != null){
        $scope.client = client;
    }
    else{
        $scope.client = ClientService.newInstance();
        $scope.client.id = "CLI1234;";
        $scope.client.name = "Client #1234";
        $scope.is_new = true;

    }
    $scope.handleAddClient = function () {

        if($scope.is_new){
            ClientService.addClient($scope.client);
        }

        $uibModalInstance.close($scope.client);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);