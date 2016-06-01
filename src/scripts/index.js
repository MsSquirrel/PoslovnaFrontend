var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.router', 'ngStorage', 'angular-jwt']);
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
myApp.controller('editCompanyCtrl', require('./editCompanyController.js'));
myApp.controller('mainCtrl', require('./mainController.js'));
myApp.controller('loginCtrl', require('./loginController.js'));
myApp.controller('editPlaceCtrl', require('./editPlaceController.js'));
myApp.controller('editMeasUnitCtrl', require('./editMeasUnitController.js'));
myApp.controller('editPdvCtrl', require('./editPdvController.js'));
myApp.controller('editBusinessYearCtrl', require('./editBusinessYearController.js'));
myApp.controller('editPdvRateCtrl', require('./editPDVRateController.js'));
myApp.controller('editPartnerCtrl', require('./editPartnerController.js'));
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
      '$stateParams', '$state', '$uibModal', '$rootScope' ,
          function($stateParams, $state, $uibModal, $rootScope) {
          console.log('hello world!');

          $uibModal.open({
            templateUrl: tempUrl,
            //template: '<div modal-data> <ng-include-template:' + tempUrl + '</ng-include-template></div modal-data>' + ... dugmici,
            controller: ctrl
        }).result.finally(function() {
            $state.go('^', {}, {reload:true}).then(function(){
              console.log('here');
              console.log($rootScope.currentState);
            });
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
        controller: 'mestaCtrl',
        data: {
            isModal: false
        }
      })
      .state('mesta.createPlace',{
         views:{
            "": {
              templateUrl: './templates/createPlace.html', 
              controller: "mestaCtrl",
            }
          },
          data: {
                isModal: false
          }
      })
       .state('mesta.editPlace', { 
        url: "/edit/:id",

        views:{
            "": {
              templateUrl: './templates/editPlace.html', 
              controller: "editPlaceCtrl",
            }
        }
      })
      .state('preduzeca', {
        url: '/preduzeca',
        templateUrl: './templates/preduzeca.html',
        controller: 'preduzeceCtrl',
        data: {
            isModal: false
        }
      })
      .state('preduzeca.createCompany.createPlace', {
        onEnter: generateOnEnterModal("./templates/createPlace.html", "mestaCtrl"),
         data: {
            isModal: true
        }
      })
      .state('preduzeca.createCompany', { 
         views:{
            "": {
              templateUrl: './templates/createCompany.html', 
              controller: "preduzeceCtrl"
            }
          },
          data: {
            isModal: false
          }
      })
      .state('preduzeca.editCompany', { 
        url: "/edit/:id",

         views:{
            "": {
              templateUrl: './templates/editCompany.html', 
              controller: "editCompanyCtrl",
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
        controller: 'merne-jediniceCtrl',
        data: {
            isModal: false
        }
      })
      .state('merne-jedinice.createMeasUnit', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createMeasUnit.html', 
              controller: "merne-jediniceCtrl"
            }
          }
      })
      .state('merne-jedinice.editMeasUnit', { 
        url: "/edit/:id",

        views:{
            "": {
              templateUrl: './templates/editMeasUnit.html', 
              controller: "editMeasUnitCtrl",
            }
        }
      })
      .state('pdv', {
        url: '/pdv',
        templateUrl: './templates/pdv.html',
        controller: 'pdvCtrl',
        data: {
            isModal: false
        }
      })
      .state('pdv.createPDV', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createPDV.html', 
              controller: "pdvCtrl"
            }
          }
      })
      .state('pdv.editPDV', { 
        url: "/edit/:id",

        views:{
            "": {
              templateUrl: './templates/editPDV.html', 
              controller: "editPdvCtrl",
            }
        }
      })
      .state('poslovne-godine', {
        url: '/poslovne-godine',
        templateUrl: './templates/poslovne-godine.html',
        controller: 'poslovne-godineCtrl',
        data: {
            isModal: false
        }
      })
      .state('poslovne-godine.createBusinessYear', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createBusinessYear.html', 
              controller: "poslovne-godineCtrl"
            }
          }
      })
      .state('poslovne-godine.editBusinessYear', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editBusinessYear.html', 
              controller: "editBusinessYearCtrl",
            }
        }
      })
      .state('poslovni-partneri', {
        url: '/poslovni-partneri',
        templateUrl: './templates/poslovni-partneri.html',
        controller: 'poslovni-partneriCtrl',
        data: {
              isModal: false
        }
      })
      .state('poslovni-partneri.createPartner', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createPartner.html', 
              controller: "poslovni-partneriCtrl"
            }
          }
      })
      .state('poslovni-partneri.editPartner', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editPartner.html', 
              controller: "editPartnerCtrl",
            }
        }
      })
      .state('poslovni-partneri.createPartner.createPlace', {
        onEnter: generateOnEnterModal("./templates/createPlace.html", "mestaCtrl"),
         data: {
            isModal: true
        }
      })
      .state('poslovni-partneri.createPartner.createCompany', {
        onEnter: generateOnEnterModal("./templates/createCompany.html", "preduzeceCtrl"),
         data: {
            isModal: true
        }
      })
      .state('prijemni-dokumenti', {
        url: '/prijemni-dokumenti',
        templateUrl: './templates/prijemni-dokumenti.html',
        controller: 'prijemni-dokumentiCtrl',
        data: {
              isModal: false
        }
      })
      .state('prijemni-dokumenti.createWarehouseReceipt', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createWarehouseReceipt.html', 
              controller: "prijemni-dokumentiCtrl"
            }
          }
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
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'loginCtrl'
      })
      .state('stavke-dokumenata', {
        url: '/stavke-dokumenata',
        templateUrl: './templates/stavke-dokumenata.html',
        controller: 'stavke-dokumenataCtrl'
      })
      .state('stope-pdv-a', {
        url: '/stope-pdv-a',
        templateUrl: './templates/stope-pdv-a.html',
        controller: 'stope-pdv-aCtrl',
        data: {
            isModal: false
        }
      })
      .state('stope-pdv-a.createPDVRate', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createPDVRate.html', 
              controller: "stope-pdv-aCtrl"
            }
          }
      })
      .state('stope-pdv-a.createPDVRate.createPDV', {
        onEnter: generateOnEnterModal("./templates/createPDV.html", "pdvCtrl"),
         data: {
              isModal: true
          }
      })
      .state('stope-pdv-a.editPDVRate', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editPDVRate.html', 
              controller: "editPdvRateCtrl",
            }
        }
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
.service('faktureService', require('./faktureService.js'))
.service('loginService', require('./loginService.js'))
.service('prijemniDokumentiService', require('./prijemni-dokumentiService.js'));

myApp
.run(require('./run.js'));



