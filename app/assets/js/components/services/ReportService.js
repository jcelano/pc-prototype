'use strict';

angular.module('reportService', [])
    .service('ReportService', ['FileService', function(FileService) {
        /*
        * Report object constructor
        * */
        function Report(client, drug, study, deliverables, report_params){
            this.client = client;
            this.drug = drug;
            this.study = study;
            this.deliverables = deliverables;
            this.report_params = report_params;
        }



        /*
        public API
        * */
        return {
            newInstance: function(){
                return new Report();
            }
        };
}]);