'use strict';

angular.module('reportService', [])
    .service('ReportService', ['FileService', function(FileService) {
        /*
        * Report object constructor
        * */
        function Report(client, drug, study, deliverables, report_params){
            this.id = new Date().getTime();
            this.client = client;
            this.drug = drug;
            this.study = study;
            this.deliverables = deliverables;
            this.parameters = report_params;
        }

        this.saveReportSettings = function(report){
            // save the overal report settings, we could load them later
            FileService.saveReportSettings(report);

            //create a client directory
            FileService.createReportDirectoriesAndData(report);

        };

        this.newInstance = function(){
            return new Report();
        }

}]);