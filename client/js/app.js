var app = angular.module('hotswapApp', ['ngMaterial', 'ui.router']);
var request = require('request');

app.controller("AppCtrl", function ($scope) {
    //   electron.dialog.showErrorBox('Oppps!','Looks like I messed something up...');
});

app.controller('PatientListController', function ($scope, $http) {
    request.get('http://localhost:3000', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var csv = body;
            console.log(csv);
        }
    });
    $http.get("views/data/patient-list.json").then(function (response) {
        $scope.patients = response.data.patient;
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/ui-views/login.html'
        })

        .state('patient-list', {
            url: '/patient-list',
            controller: 'PatientListController',
            templateUrl: 'views/ui-views/patient-list.html'
        })

        .state('about', {

        });

});