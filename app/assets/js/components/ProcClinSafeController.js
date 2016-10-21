'use strict';
//'pageFactory'
// Define the `phonecatApp` module
var procClinFreeApp = angular.module('procClinFreeApp');

// Define the `PhoneListController` controller on the `phonecatApp` module
procClinFreeApp.controller('ProcClinFreeController', ['$scope', 'PageFactory', 'ClientFactory',
    function PhoneListController($scope, PageFactory, ClientFactory,DrugFactory) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = PageFactory;

        console.log(PageFactory.version());

        $scope.clients = ClientFactory.list();
        $scope.selectedClient = new ClientFactory();

        $scope.handleClientChanged = function(){
            $scope.selectedClient.loadDrugs();
        }

        $scope.handleAddClient = function(){
            alert("Not implemented yet");
        }
}]);