'use strict';
angular.module('procClinSafeApp').controller('reportWizardController',
    ['$timeout', '$scope', '$uibModal', 'PageFactory', 'ReportService', 'ClientService', 'StudyService', 'DeliverableService',
    function ReportWizardController($timeout, $scope, $uibModal, PageFactory, ReportService, ClientService,
                                    StudyService, DeliverableService) {
        $scope.instructions = "To add a new report, first choose a client and then click the next button";
        $scope.app_info = {version: PageFactory.version(), title:PageFactory.title()};
        $scope.paging = {studies:{currentPage:1, itemsPerPage:5},deliverables:{currentPage:1, itemsPerPage:4}};
        $scope.step = 1;
        $scope.numberOfSteps = 5;
        $scope.progressBarPct = 10;
        $scope.report = ReportService.newInstance();

        $scope.handleClientChanged = function(){
            $scope.report.drug = null;
            $scope.report.study = null;
            $scope.report.deliverables = null;
        };

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
                $scope.report.client = data;
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
                    drug: !is_new?$scope.report.drug:null
                }
            }).result.then(function(data){
                //console.log(data);
                $scope.report.drug = data;
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
                $scope.report.study = data;
            });
        };

        $scope.handleEditDeliverable = function(is_new){
            $uibModal.open({
                //parentElem:parentElem,
                animation: true,
                templateUrl: 'pages/add_deliverable.html',
                controller: 'DeliverableCrudController',
                resolve: {
                    client: $scope.report.client,
                    drug: $scope.report.drug,
                    study: $scope.report.study,
                    deliverable:DeliverableService.newInstance()
                }
            }).result.then(function(data){
                //console.log(data);
                if($scope.report.deliverables == null){
                    $scope.report.deliverables = [];
                }
                $scope.report.deliverables.push(data);
            });
        };

        $scope.handleAddDeliverable = function(){
            const deliverable = DeliverableService.newInstance();

            ClientService.addDeliverableToStudy($scope.report.client.id, $scope.report.drug.id, $scope.report.study.id, deliverable);
        };

        $scope.toggleDeliverableSelection = function(deliverable){
            if($scope.report.deliverables == null){
                $scope.report.deliverables = [];
            }

            if(deliverable.checked){
                $scope.report.deliverables.push(deliverable);
            }
            else{
                if($scope.report.deliverables.length > 0){
                    for(let i = 0;i<$scope.report.deliverables.length;++i){
                        if($scope.report.deliverables[i].id == deliverable.id){
                            $scope.report.deliverables.splice(i, 1);
                            break;
                        }
                    }
                }
            }
        }

        $scope.handleSaveDeliverable = function(id){
            ClientService.saveState();
        };


        $scope.handleDeleteDeliverable = function(id){
            ClientService.deleteDeliverableFromStudy($scope.report.client.id, $scope.report.drug.id, $scope.report.study.id, id);
        };

        $scope.handleRunReport =  function(){
            ReportService.saveReportSettings($scope.report);
        }
        $scope.incrementStep = function(v){
            $scope.step = $scope.step + v;
            moveProgressBar(v);
            setupReportValues();
        };


        $scope.readyForNextStep = function(report){
            switch($scope.step){
                case 1:
                    return report.client != null && report.client.id != null;
                    break;
                case 2:
                    return report.drug != null && report.drug.id != null;
                    break;
                case 3:
                    return report.study != null && report.study.id != null;
                    break;
                case 4:
                    return report.deliverables != null && report.deliverables.length > 0;
                    break;

            }
            return false;
        };

        function setupReportValues(){
            const report = $scope.report;
            switch($scope.step){
                case 1:
                    if((report.client == null || report.client.id == null) && $scope.clients.length > 0){
                        //the client wasn't already set and we have a client
                        $scope.report.client = $scope.clients[0];
                    }
                    break;
                case 2:
                    if((report.drug == null || report.drug.id == null)
                        && report.client.drugs != null && report.client.drugs.length > 0 ){
                        //the client wasn't already set and we have a client
                        $scope.report.drug = $scope.report.client.drugs[0];
                    }
                    else{
                        //$scope.report.drug ==
                    }

                    return report.drug != null && report.drug.id != null;
                    break;
                case 3:
                    return report.study != null && report.study.id != null;
                    break;
                case 4:
                    return report.deliverables != null && report.deliverables.length > 0;
                    break;

            }
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

        return ClientService.list().then(function(clients){
            //this $timeout is here b/c the File reading doesn't call $scope.digest for some reason
            // if we get rid of the file part we can remove the $timeout
            $timeout(function() {
                $scope.clients = clients;
                if ($scope.clients.length > 0) {
                   // $scope.report.client = $scope.clients[0];
                }
                // $scope.$apply();
            });
        });


    }]);
