var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.router']);
myApp.controller('preduzeceCtrl', require('./preduzeceController.js'));
myApp.controller('documentsCtrl', require('./documentsListController.js'));
myApp.controller('mestaCtrl', require('./mestaController.js'));
myApp.controller('analitikaCtrl', require('./analitikaController.js'));
myApp.controller('faktureCtrl', require('./faktureController.js'));
myApp.controller('grupe-robaCtrl', require('./grupe-robaController.js'));
myApp.controller('magaciniCtrl', require('./magaciniController.js'));
myApp.controller('merne-jediniceCtrl', require('./merne-jediniceController.js'));
myApp.controller('pdvCtrl', require('./pdvController.js'));
myApp.controller('poslovne-godineCtrl', require('./poslovne-godineController.js'));
myApp.controller('poslovni-partneriCtrl', require('./poslovni-partneriController.js'));
myApp.controller('prijemni-dokumentiCtrl', require('./prijemni-dokumentiController.js'));
myApp.controller('robaCtrl', require('./robaController.js'));
myApp.controller('robne-karticeCtrl', require('./robne-karticeController.js'));
myApp.controller('stavke-dokumenataCtrl', require('./stavke-dokumenataController.js'));
myApp.controller('stope-pdv-aCtrl', require('./stope-pdv-aController.js'));
myApp.filter('true_false', function() {
    return function(text, length, end) {
        if (text) {
            return 'Da';
        }
        return 'Ne';
    }
});


function generateOnEnterModal(tempUrl, ctrl){
   return [
      '$stateParams', '$state', '$uibModal', 
          function($stateParams, $state, $uibModal) {
          console.log('hello world!');

          $uibModal.open({
            templateUrl: tempUrl,
            controller: ctrl
        }).result.finally(function() {
            $state.go('^');
        });
    }]
};

myApp.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/main");

    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: './templates/main.html',
        controller: 'preduzeceCtrl'
      })
      .state('documents', {
        url:'/documents',
        templateUrl: './templates/documentsList.html',
        controller: 'documentsCtrl'
      })
      .state('mesta', {
        url: '/mesta',
        templateUrl: './templates/mesta.html',
        controller: 'mestaCtrl'
      })
      .state('preduzeca', {
        url: '/preduzeca',
        templateUrl: './templates/preduzeca.html',
        controller: 'preduzeceCtrl'
      })
      .state('preduzeca.createCompany.createPlace', {
       // onEnter: generateOnEnterModal("./templates/createPlace.html", "mestaCtrl")
        //templateurl: './templates/createPlace.html',
        //controller: 'mestaCtrl'
          views:{
            "@preduzeca":{
              templateUrl: './templates/createPlace.html', 
              controller: "mestaCtrl"
            }
          }
         
      })
      .state('preduzeca.createCompany', { 
       // templateUrl: "./templates/createCompany.html",
        //controller: "preduzeceCtrl"
         views:{
            "": {
              templateUrl: './templates/createCompany.html', 
              controller: "preduzeceCtrl"
            }
          }
      })
      .state('analitika', {
        url: '/analitika',
        templateUrl: './templates/analitika.html',
        controller: 'analitikaCtrl'
      })
      .state('fakture', {
        url: '/fakture',
        templateUrl: './templates/fakture.html',
        controller: 'faktureCtrl'
      })
      .state('grupe-roba', {
        url: '/grupe-roba',
        templateUrl: './templates/grupe-roba.html',
        controller: 'grupe-robaCtrl'
      })
      .state('magacini', {
        url: '/magacini',
        templateUrl: './templates/magacini.html',
        controller: 'magaciniCtrl'
      })
      .state('merne-jedinice', {
        url: '/merne-jedinice',
        templateUrl: './templates/merne-jedinice.html',
        controller: 'merne-jediniceCtrl'
      })
      .state('pdv', {
        url: '/pdv',
        templateUrl: './templates/pdv.html',
        controller: 'pdvCtrl'
      })
      .state('poslovne-godine', {
        url: '/poslovne-godine',
        templateUrl: './templates/poslovne-godine.html',
        controller: 'poslovne-godineCtrl'
      })
      .state('poslovni-partneri', {
        url: '/poslovni-partneri',
        templateUrl: './templates/poslovni-partneri.html',
        controller: 'poslovni-partneriCtrl'
      })
      .state('prijemni-dokumenti', {
        url: '/prijemni-dokumenti',
        templateUrl: './templates/prijemni-dokumenti.html',
        controller: 'prijemni-dokumentiCtrl'
      })
      .state('roba', {
        url: '/roba',
        templateUrl: './templates/roba.html',
        controller: 'robaCtrl'
      })
      .state('robne-kartice', {
        url: '/robne-kartice',
        templateUrl: './templates/robne-kartice.html',
        controller: 'robne-karticeCtrl'
      })
      .state('stavke-dokumenata', {
        url: '/stavke-dokumenata',
        templateUrl: './templates/stavke-dokumenata.html',
        controller: 'stavke-dokumenataCtrl'
      })
      .state('stope-pdv-a', {
        url: '/stope-pdv-a',
        templateUrl: './templates/stope-pdv-a.html',
        controller: 'stope-pdv-aCtrl'
      });
}]);


myApp
.service('mestaService', require('./mestaService.js'))
.service('preduzecaService', require('./preduzecaService.js'))
.service('merneJediniceService', require('./merne-jediniceService.js'))
.service('pdvService', require('./pdvService.js'))
.service('poslovneGodineService', require('./poslovne-godineService.js'))
.service('stopePDVService', require('./stope-pdv-aService.js'))
.service('partneriService', require('./poslovni-partneriService.js'))
.service('robaService', require('./robaService.js'))
.service('magaciniService', require('./magaciniService.js'))
.service('grupeRobaService', require('./grupe-robaService.js'))
.service('faktureService', require('./faktureService.js'));


myApp
.run(require('./run.js'));



