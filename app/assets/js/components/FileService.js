
var pcs = angular.module('procClinSafeApp');

pcs.service('FileService', function() {

    function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

    const electron = nodeRequire('electron');
    const jetpack = _interopDefault(nodeRequire('fs-jetpack'));

    const app = electron.remote;
    const dialog = app.dialog;
    const path = nodeRequire('path');
    const fs = nodeRequire('fs');
    const CLIENTS_FILE = "clients.json";
    const userDataDir = jetpack.cwd(app.app.getPath('userData'));
    // service is just a constructor function
    // that will be called with 'new'

    this.test = function(name) {
        return "The settings file is located at - " + this.loadSettings();
    };

    this.showOpen = showOpen;

    this.saveClients = function(clients){
        var fileName = userDataDir.path() + path.sep + CLIENTS_FILE;
        this.saveJSON(fileName, clients)
    };

    this.loadClients = function(){
        var fileName = userDataDir.path() + path.sep + CLIENTS_FILE;
        return readJson(fileName);
    };

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

            fs.writeFile(fileName, content, function (err) {
                if(err){
                    alert("An error ocurred creating the file "+ err.message)
                }

                alert("The file has been succesfully saved ");
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
        return fs.readFile(filepath, 'utf-8', function (err, data) {
            if(err){
                alert("An error ocurred reading the file :" + err.message);
                return;
            }

            document.getElementById("content-editor").value = data;
        });
    }

    function deleteFile(filepath){
        fs.exists(filepath, function(exists) {
            if(exists) {
                // File exists deletings
                fs.unlink(filepath,function(err){
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
        fs.writeFile(filepath, content, function (err) {
            if(err){
                alert("An error ocurred updating the file"+ err.message);
                console.log(err);
                return;
            }

            alert("The file has been succesfully saved to " + filepath);
        });
    }
});