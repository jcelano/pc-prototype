
var pcs = angular.module('procClinSafeApp');

pcs.service('FileService', ['$http', function($http) {

    const CLIENTS_FILE = "/files/client";// userDataDir.path() + path.sep + DATA_DIR + path.sep + "clients.json";

    const REPORTS_DIR = "https://desolate-sierra-98327.herokuapp.com/reports";

    this.saveReportSettings = function(report){
     //   const fileName = REPORTS_DIR + path.sep + "report_" + report.id + ".json";
     //   this.saveJSON(fileName, report);
    };

    /*
    saves the client meta data that is used for the UI
    * */
    this.saveClients = function(clients){
        return $http.post(CLIENTS_FILE, clients).then(function(response) {
            clients = response.data;
            return clients;
        });
        return;
    };

    /*
    * load the client meta data that is use by the UI
    * */
    this.loadClients = function(){
        var fileName = CLIENTS_FILE;
        return $http.get(fileName).then(function(response) {
            clients = response.data;
            return clients;
        });
        return;
    };


    this.loadSettings = function(){
        //TBD
    };



    function showOpen(){
        //TBD need to get a listing of the files in AWS and show them
    }



    function showSave(){
        //TBD need to just ask for a name or something???
    }

}]);