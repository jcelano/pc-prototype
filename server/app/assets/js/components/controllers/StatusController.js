'use strict';

angular.module('procClinSafeApp').controller('statusController', ['$scope',
    function StatusController($scope) {
        $scope.reports = mockup();
        $scope.currentPage = 1;
        $scope.numPerPage = 7;

        $scope.paginate = function(report) {
            let index=0;
            const begin = ($scope.currentPage - 1) * $scope.numPerPage;
            const end = begin + $scope.numPerPage;
            for(let i = 0;i<$scope.reports.length;++i){
                if($scope.reports[i].id == report.id){
                    index = i;
                    break;
                }
            }
            return (begin <= index && index < end);
        };

        function Report(id, name, date, executionTime){
            return {id:id, name:name, date:date, executionTime:executionTime};
        }

        function mockup(){
            var ret = [];
            for(let i = 1; i<100;++i){
                var date = new Date();
                date.setYear(2014);
                date.setMonth(i);
                let execTime = Math.floor(Math.random() * 10000);
                ret.push(Report("REP"+i, "Report #" + i + "for FooBar Company", date, execTime));

            }

            return ret;
        }

}]);
