var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap']);
myApp.controller('preduzeceCtrl', require('./preduzeceController.js'));
myApp.controller('documentsCtrl', require('./documentsListController.js'));
myApp.controller('placesCtrl', require('./placesController.js'));

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/main', {
        templateUrl: './templates/main.html',
        controller: 'preduzeceCtrl'
      }).
      when('/documents', {
        templateUrl: './templates/documentsList.html',
        controller: 'documentsCtrl'
      }).
      when('/places', {
        templateUrl: './templates/places.html',
        controller: 'placesCtrl'
      }).
      when('/preduzeca', {
        templateUrl: './templates/preduzeca.html',
        controller: 'preduzeceCtrl'
      }).
      otherwise({
      	redirectTo: '/main'
      });

}]);
