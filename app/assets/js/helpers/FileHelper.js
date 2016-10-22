function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var electron = nodeRequire('electron');
var jetpack = _interopDefault(nodeRequire('fs-jetpack'));

var app = electron.remote;
var dialog = app.dialog;
var fs = nodeRequire('fs');

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

            alert("The file has been succesfully saved");
        });
    });
}

function readFile(filepath) {
    fs.readFile(filepath, 'utf-8', function (err, data) {
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

        alert("The file has been succesfully saved");
    });
}