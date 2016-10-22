'use strict';
//'pageFactory'
// Define the `phonecatApp` module
var pcs = angular.module('procClinSafeApp');

// Define the `PhoneListController` controller on the `phonecatApp` module
pcs.controller('mainController', ['$scope', 'PageFactory', 'FileService',
    function PhoneListController($scope, PageFactory, FileService) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = {version: PageFactory.version(), title:PageFactory.title(), extra:{a:{b:"c"}}};
        $scope.test_msg ="Nothing";// FileService.test();

        $scope.showOpen = FileService.showOpen;
        $scope.testSave = function(){
            $scope.test_msg =FileService.test();
            ///FileService.saveJSON("/tmp/foo.json", $scope.app_info);
        }

}]);
