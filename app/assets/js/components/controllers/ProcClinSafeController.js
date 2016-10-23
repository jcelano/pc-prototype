'use strict';
//'pageFactory'
// Define the `phonecatApp` module
var pscApp = angular.module('procClinSafeApp');

// Define the `PhoneListController` controller on the `phonecatApp` module
pscApp.controller('procClinFreeController', ['$document','$scope', '$uibModal', 'PageFactory', 'ClientFactory', 'DrugFactory', 'StudyFactory', 'DeliverableFactory',
    function PhoneListController($document, $scope, $uibModal, PageFactory, ClientFactory,DrugFactory, StudyFactory,DeliverableFactory) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = {version: PageFactory.version(), title:PageFactory.title()};
        $scope.paging = {studies:{currentPage:1, itemsPerPage:5},deliverables:{currentPage:1, itemsPerPage:4}};
        $scope.step = 1;
        $scope.numberOfSteps = 5;
        $scope.progressBarPct = 10;
        $scope.client = new ClientFactory();

        //these hold all the lists
        $scope.loadData = function(){
            //  ClientFactory.list().then(function(clients){
            //     $scope.clients = clients;
            // });
        };

        $scope.clients = ClientFactory.list();



        $scope.drugs = [];
        $scope.studies = [];
        $scope.deliverables = [];

        $scope.handleClientChanged = function(){
            $scope.drugs = DrugFactory.list($scope.client.id);
        };

        $scope.handleDrugChanged = function(){
            $scope.studies = StudyFactory.list($scope.client.id, $scope.client.drug.id);
        };

        $scope.handleStudyChange = function(){
            $scope.deliverables = DeliverableFactory.list($scope.client.id, $scope.client.drug.id, $scope.client.drug.study.id);
        };

        $scope.studiesPageChanged= function(){
            $scope.deliverables = DeliverableFactory.list($scope.client.id, $scope.client.drug.id, $scope.client.drug.study.id);
        };

        $scope.handleAddClient = function(){
            var parentElem = angular.element($document[0].querySelector('.foobar'));

            $uibModal.open({
                parentElem:parentElem,
                animation: true,
                templateUrl: 'pages/add_client.html',
                controller: 'ClientCrudController'
            });
        };


        $scope.incrementStep = function(v){
            $scope.step = $scope.step + v;
            moveProgressBar(v);
        }

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
