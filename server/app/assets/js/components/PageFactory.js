'use strict';

angular.module('pageFactory', [])
    .factory('PageFactory', function() {
        var appName = 'ProcClinSafe';
        var version = "0.0.2";
        var title = appName + ' - Prototype';
        return {
            title: function() { return title; },
            version: function() { return version; },
            name: function() { return appName; }
        };
});