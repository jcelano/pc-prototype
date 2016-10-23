'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("ClientCrudController", function($uibModalInstance, $scope) {
    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});