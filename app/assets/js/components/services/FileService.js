
var pcs = angular.module('procClinSafeApp');

pcs.service('FileService', function() {

    function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }
    const electron = nodeRequire('electron');
    const jetpack = _interopDefault(nodeRequire('fs-jetpack'));
    const path = nodeRequire('path');

    const app = electron.remote;
    const dialog = app.dialog;
    const DATA_DIR = "data";

    const userDataDir = jetpack.cwd(app.app.getPath('userData'));
    const CLIENTS_FILE = userDataDir.path() + path.sep + DATA_DIR + path.sep + "clients.json";

    const REPORTS_DIR = userDataDir.path() + path.sep + DATA_DIR + path.sep + "reports";
    // service is just a constructor function
    // that will be called with 'new'

    this.test = function(name) {
        return "The settings file is located at - " + this.loadSettings();
    };

    this.showOpen = showOpen;

    this.saveReportSettings = function(report){
        const fileName = REPORTS_DIR + path.sep + "report_" + report.id + ".json";
        this.saveJSON(fileName, report);
    };

    this.createReportDirectoriesAndData = function(report){
        const CLIENT_DIR = REPORTS_DIR + path.sep + report.client.id;

    };

    /*
    saves the client meta data that is used for the UI
    * */
    this.saveClients = function(clients){
        this.saveJSON(fileName, CLIENTS_FILE)
    };

    /*
    * load the client meta data that is use by the UI
    * */
    this.loadClients = function(){
        var fileName = CLIENTS_FILE;

        console.log(fileName);

        var clients =  readJsonAsync(fileName);
        if(clients === undefined){
            clients = [];
        }
        return clients;
    };

    /*
     helper function to save JSON
    * */
    this.saveJSON = function(fileName, obj){
        saveChanges(fileName, JSON.stringify(obj));
    };

    this.loadSettings = function(){

        var userDataDir = jetpack.cwd(app.app.getPath('userData'));
        var fileName = userDataDir.path() + path.sep + "settings.json";

        return fileName;
    };



    function showOpen(){
        dialog.showOpenDialog(function (fileNames) {
            if(fileNames === undefined){
                console.log("No file selected");
            }else{
                document.getElementById("actual-file").value = fileNames[0];
                readFile(fileNames[0]);
            }
        });
    }



    function showSave(){
        var content = document.getElementById("content-editor").value;

        dialog.showSaveDialog(function (fileName) {
            if (fileName === undefined){
                console.log("You didn't save the file");
                return;
            }

            jetpack.writeFile(fileName, content, function (err) {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                }

                console.log("The file has been succesfully saved ");
            });
        });
    }

    function readJsonAsync(filepath) {
        return jetpack.readAsync(filepath, 'json').then(function (data) {
            // if(err){
            //     alert("An error ocurred reading the file :" + err.message);
            //     return;
            // }

            return data;
        });
    }

    function readJson(filepath) {
        return jetpack.read(filepath, 'json');
    }

    function readFile(filepath) {
        return jetpack.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            document.getElementById("content-editor").value = data;
        });
    }

    function deleteFile(filepath){
        jetpack.exists(filepath, function(exists) {
            if(exists) {
                // File exists deletings
                jetpack.unlink(filepath,function(err){
                    if(err){
                        alert("An error ocurred updating the file"+ err.message);
                        console.log(err);
                        return;
                    }
                });
            } else {
                alert("This file doesn't exist, cannot delete");
            }
        });
    }

    function saveChanges(filepath,content){
        console.log("Saving " + filepath);
        jetpack.write(filepath, content);
    }
});