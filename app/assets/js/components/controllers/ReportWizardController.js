'use strict';
angular.module('procClinSafeApp').controller('reportWizardController',
    ['$scope', '$uibModal', 'PageFactory', 'ReportService', 'ClientService', 'StudyService', 'DeliverableFactory',
    function ReportWizardController($scope, $uibModal, PageFactory, ReportService, ClientService,
                                    StudyService, DeliverableFactory) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = {version: PageFactory.version(), title:PageFactory.title()};
        $scope.paging = {studies:{currentPage:1, itemsPerPage:5},deliverables:{currentPage:1, itemsPerPage:4}};
        $scope.step = 1;
        $scope.numberOfSteps = 5;
        $scope.progressBarPct = 10;
        $scope.report = ReportService.newInstance();

        $scope.clients = ClientService.list();
        if($scope.clients.length > 0){
            $scope.report.client = $scope.clients[0];
        }


        $scope.handleEditClient = function(is_new){
            $uibModal.open({
                //parentElem:parentElem,
                animation: true,
                templateUrl: 'pages/add_client.html',
                controller: 'ClientCrudController',
                resolve: {
                    client: !is_new?$scope.report.client:null
                }
            }).result.then(function(data){
                console.log(data);
                $scope.client = data;
            });
        };

        $scope.handleEditDrug = function(is_new){
            $uibModal.open({
                //parentElem:parentElem,
                animation: true,
                templateUrl: 'pages/add_drug.html',
                controller: 'DrugCrudController',
                resolve: {
                    client: $scope.report.client,
                    drug: !is_new?$scope.report.client.drug:null
                }
            }).result.then(function(data){
                //console.log(data);
                //$scope.client.drug = data;
            });
        };

        $scope.handleEditStudy = function(is_new){
            $uibModal.open({
                //parentElem:parentElem,
                animation: true,
                templateUrl: 'pages/add_study.html',
                controller: 'StudyCrudController',
                resolve: {
                    client: $scope.report.client,
                    drug: $scope.report.drug,
                    study: !is_new?$scope.report.study:null
                }
            }).result.then(function(data){
                //console.log(data);
                //$scope.client.drug = data;
            });
        };

        $scope.incrementStep = function(v){
            $scope.step = $scope.step + v;
            moveProgressBar(v);
        };

        function moveProgressBar(v){

            var number_of_steps = $scope.numberOfSteps;
            var now_value = $scope.progressBarPct;
            var new_value = 0;
            if(v > 0) {
                new_value = now_value + ( 100 / number_of_steps );
            }
            else if(v < 0) {
                new_value = now_value - ( 100 / number_of_steps );
            }
            else{
                new_value = now_value;
            }
            $scope.progressBarPct =  new_value;

        }

}]);
