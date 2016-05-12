var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap']);
myApp.controller('loginCtrl', require('./loginController.js'));
myApp.controller('preduzeceCtrl', require('./preduzeceController.js'));
myApp.controller('documentsCtrl', require('./documentsListController.js'));

myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: './templates/login.html',
        controller: 'loginCtrl'
      }).
      when('/documentsList', {
        templateUrl: './templates/documentsList.html',
        controller: 'documentsCtrl'
      }).
      otherwise({
      	redirectTo: '/login'
      });

}]);
