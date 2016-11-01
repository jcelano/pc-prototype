'use strict';
var pscApp = angular.module('procClinSafeApp');

pscApp.controller("DeliverableCrudController",
    ['$uibModalInstance', '$scope', 'ClientService', 'DeliverableService', 'client','drug', 'study', 'deliverable',
    function ($uibModalInstance, $scope, ClientService, DeliverableService, client, drug, study, deliverable) {
        $scope.is_new = false;
        $scope.client = client;
        $scope.drug = drug;
        $scope.study = study;

        if (deliverable != null && deliverable.id != null) {
            $scope.deliverable = deliverable;
        }
        else {
            $scope.deliverable = DeliverableService.newInstance();
            $scope.is_new = true;

        }

        $scope.handleDeleteDeliverable = function () {

            ClientService.deleteDeliverableFromStudy($scope.client.id, $scope.drug.id, $scope.study_id, $scope.deliverable.id);

            $uibModalInstance.dismiss('cancel');
        };

        $scope.handleAddDeliverable = function () {

            if ($scope.is_new) {
                ClientService.addDeliverableToStudy($scope.client.id, $scope.drug.id, $scope.study.id, $scope.deliverable);
            }
            else{
                //this was just an update, so it should be all set
                ClientService.saveState();
            }

            $uibModalInstance.close($scope.deliverable);
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }]).directive('deliverableId', ['ClientService', function(ClientService) {
    return {

        // limit usage to argument only
        restrict: 'A',

        // require NgModelController, i.e. require a controller of ngModel directive
        require: 'ngModel',

        // create linking function and pass in our NgModelController as a 4th argument
        link: function(scope, element, attr, ctrl) {
            function customValidator(ngModelValue) {
                if(ClientService.getDeliverableByStudyById(scope.client.id, scope.drug.id, scope.study.id, ngModelValue)){
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