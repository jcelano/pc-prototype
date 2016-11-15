'use strict';
//'pageFactory'
// Define the `phonecatApp` module
var pcs = angular.module('procClinSafeApp');

// Define the `PhoneListController` controller on the `phonecatApp` module
pcs.controller('mainController', ['$scope', '$location', 'PageFactory',
    function MainController($scope, $location, PageFactory) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = {version: PageFactory.version(), title:PageFactory.title(), extra:{a:{b:"c"}}};
        $scope.test_msg ="Nothing";// FileService.test();
        $scope.current_page = "status";

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };

}]);
