(function () {'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }


var fs = _interopDefault(nodeRequire('fs'));
var os = _interopDefault(nodeRequire('os'));
var electron = nodeRequire('electron');
var jetpack = _interopDefault(nodeRequire('fs-jetpack'));

var greet = function () {
    return 'Hello World!';
};


var showFiles = function(){
    var path = '/tmp';
    return jetpack.listAsync(path).then(function(files){
        console.log(files);
        return files;
    });
};

// Simple wrapper exposing environment variables to rest of the code.

// The variables have been written to `env.json` by the build process.
var env = jetpack.cwd(__dirname).read('env.json', 'json');

// Here is the starting point for your application code.
// All stuff below is just to show you how it works. You can delete all of it.

// Use new ES6 modules syntax for everything.
// native node.js module
// native electron module
// module loaded from npm
// code authored by you in this project
console.log('Loaded environment variables:', env);

var app = electron.remote.app;
var appDir = jetpack.cwd(app.getAppPath());


// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)
console.log('The author of this app is:', appDir.read('package.json', 'json').author);

document.addEventListener('DOMContentLoaded', function () {
    //document.getElementById('greet').innerHTML = greet();
    //document.getElementById('platform-info').innerHTML = os.platform();
    //document.getElementById('env-name').innerHTML = env.name;
    showFiles();
});
}());
//# sourceMappingURL=app.js.map