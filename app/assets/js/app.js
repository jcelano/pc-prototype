'use strict';

//var procClinFreeApp = angular.module('procClinFreeApp', ['pageFactory', 'clientFactory', 'drugFactory']);
var pcsApp = angular.module('procClinSafeApp', ['ngRoute','ui.bootstrap','ngMaterial', 'material.svgAssetsCache',
    'pageFactory', 'reportService', 'clientService', 'drugService','studyService', 'deliverableFactory']);


pcsApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
    .when('/', {
        templateUrl : 'pages/report_wizard.html',
        controller  : 'reportWizardController'
    })

    .when('/wizard', {
        templateUrl : 'pages/report_wizard.html',
        controller  : 'reportWizardController'
    })
    // route for the about page
    .when('/settings', {
        templateUrl : 'pages/settings.html',
        controller  : 'settingsController'
    })

    // route for the contact page
    .when('/status', {
        templateUrl : 'pages/status.html',
        controller  : 'statusController'
    });
});