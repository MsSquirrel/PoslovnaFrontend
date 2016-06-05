var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns', 'ui.router', 'ngStorage', 'angular-jwt']);
myApp.controller('preduzeceCtrl', require('./preduzeceController.js'));
myApp.controller('preduzecaCtrl', require('./preduzecaController.js'));
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
myApp.controller('registerCtrl', require('./registerController.js'));
myApp.controller('editPlaceCtrl', require('./editPlaceController.js'));
myApp.controller('editMeasUnitCtrl', require('./editMeasUnitController.js'));
myApp.controller('editPdvCtrl', require('./editPdvController.js'));
myApp.controller('editBusinessYearCtrl', require('./editBusinessYearController.js'));
myApp.controller('editPdvRateCtrl', require('./editPDVRateController.js'));
myApp.controller('editPartnerCtrl', require('./editPartnerController.js'));
myApp.controller('editWaresCtrl', require('./editWaresController.js'));
myApp.controller('editWareGroupCtrl', require('./editWareGroupController.js'));
myApp.controller('editWarehouseCtrl', require('./editWarehouseController.js'));
myApp.controller('editWarehouseCtrl', require('./editWarehouseController.js'));
myApp.controller('editUserCtrl', require('./editUserController.js'));
myApp.controller('editWarehouseReceiptCtrl', require('./editWarehouseReceiptController.js'));
myApp.controller('editDocumentItemCtrl', require('./editDocumentItemController.js'));


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
      .state('preduzece', {
        url: '/main',
        templateUrl: './templates/preduzece.html',
        controller: 'preduzeceCtrl'
      })
      .state('user', {
        url: '/user',
        templateUrl: './templates/editUser.html',
        controller: 'editUserCtrl'
      })
      .state('preduzece.edit', { 
        url: "/edit/:id",
         views:{
            "": {
              templateUrl: './templates/editCompany.html', 
              controller: "editCompanyCtrl",
            }
          }
      })
      .state('documents', {
        url:'/documents',
        templateUrl: './templates/documentsList.html',
        controller: 'documentsCtrl'
      })
      .state('mesta', {
        url: '/mesta?naziv&pb',//TODOR
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
        url: '/preduzeca?mestoId',
        templateUrl: './templates/preduzeca.html',
        controller: 'preduzecaCtrl',
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
              controller: "preduzecaCtrl"
            }
          },
          data: {
            isModal: false
          }
      })
      /*.state('preduzeca.editCompany', { 
        url: "/edit/:id",

         views:{
            "": {
              templateUrl: './templates/editCompany.html', 
              controller: "editCompanyCtrl",
            }
          }
      })*/
      .state('analitika', {
        url: '/analitika?robnaKarticaId',
        templateUrl: './templates/analitika.html',
        controller: 'analitikaCtrl'
      })
      .state('fakture', {
        url: '/fakture?poslovnaGodinaId?partnerId',
        templateUrl: './templates/fakture.html',
        controller: 'faktureCtrl'
      })
      .state('grupe-roba', {
        url: '/grupe-roba?pdvId?preduzeceId?naziv',
        templateUrl: './templates/grupe-roba.html',
        controller: 'grupe-robaCtrl',
        data: {
          isModal: false
        }
      })
      .state('grupe-roba.createWareGroup', { 
         views:{
            "": {
              templateUrl: './templates/createWareGroup.html', 
              controller: "grupe-robaCtrl",
            }
          },
          data: {
            isModal: false
          }
      })
      .state('grupe-roba.createWareGroup.createPDV', {
        onEnter: generateOnEnterModal("./templates/createPDV.html", "pdvCtrl"),
         data: {
            isModal: true
        }
      })
      .state('grupe-roba.createWareGroup.createCompany', {
        onEnter: generateOnEnterModal("./templates/createCompany.html", "preduzeceCtrl"),
         data: {
            isModal: true
        }
      })
       .state('grupe-roba.editWareGroup', { 
        url: "/edit/:id",

         views:{
            "": {
              templateUrl: './templates/editWareGroup.html', 
              controller: "editWareGroupCtrl",
            }
          }
      })
       .state('magacini', {
        url: '/magacini?preduzeceId?mestoId&naziv',
        templateUrl: './templates/magacini.html',
        controller: 'magaciniCtrl',
        data: {
            isModal: false
        }
      })
      .state('magacini.createWarehouse', { 
         views:{
            "": {
              templateUrl: './templates/createWarehouse.html', 
              controller: "magaciniCtrl",
            }
          },
          data: {
            isModal: false
          }
      })
       .state('magacini.createWarehouse.createPlace', {
        onEnter: generateOnEnterModal("./templates/createPlace.html", "mestaCtrl"),
         data: {
            isModal: true
        }
      })
      .state('magacini.createWarehouse.createCompany', {
        onEnter: generateOnEnterModal("./templates/createCompany.html", "preduzeceCtrl"),
         data: {
            isModal: true
        }
      })
      .state('magacini.editWarehouse', { 
        url: "/edit/:id",

        views:{
            "": {
              templateUrl: './templates/editWarehouse.html', 
              controller: "editWarehouseCtrl",
            }
          }
      })
      .state('merne-jedinice', {
        url: '/merne-jedinice?naziv&oznaka',///// TODOR
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
        url: '/poslovne-godine?preduzeceId',
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
        url: '/poslovni-partneri?mestoId?preduzeceId?naziv&mb&pib',
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
        url: '/prijemni-dokumenti?poslovnaGodinaId&partnerId&magacinId&rbr',
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
      .state('prijemni-dokumenti.editWarehouseReceipt', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editWarehouseReceipt.html', 
              controller: "editWarehouseReceiptCtrl",
            }
        }
      })
      .state('roba', {
        url: '/roba?jedinicaMereId?preduzeceId?grupaRobaId&naziv',
        templateUrl: './templates/roba.html',
        controller: 'robaCtrl',
        data: {
              isModal: false
        }
      })
      .state('roba.createWares', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createWares.html', 
              controller: "robaCtrl"
            }
          }
      })
     .state('roba.createWares.createCompany', {
        onEnter: generateOnEnterModal("./templates/createCompany.html", "preduzeceCtrl"),
         data: {
            isModal: true
        }
      })
      .state('roba.createWares.createMeasUnit', {
        onEnter: generateOnEnterModal("./templates/createMeasUnit.html", "merne-jediniceCtrl"),
         data: {
            isModal: true
        }
      })
      .state('roba.createWares.createWareGroup', {
        onEnter: generateOnEnterModal("./templates/createWareGroup.html", "grupe-robaCtrl"),
         data: {
            isModal: true
        }
      })
      .state('roba.editWares', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editWares.html', 
              controller: "editWaresCtrl",
            }
        }
      })
      .state('robne-kartice', {
        url: '/robne-kartice?poslovnaGodinaId&magacinId&robaId',
        templateUrl: './templates/robne-kartice.html',
        controller: 'robne-karticeCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'loginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: './templates/register.html',
        controller: 'registerCtrl'
      })
      .state('stavke-dokumenata', {
        url: '/stavke-dokumenata?robaId&prijemniDokumentId',
        templateUrl: './templates/stavke-dokumenata.html',
        controller: 'stavke-dokumenataCtrl',
        data: {
              isModal: false
        }
      })
      .state('stavke-dokumenata.createDocumentItem', { 
          data: {
              isModal: false
          },
         views:{
            "": {
              templateUrl: './templates/createDocumentItem.html', 
              controller: "stavke-dokumenataCtrl"
            }
          }
      })
      .state('stavke-dokumenata.editDocumentItem', { 
        url: "/edit/:id",
        views:{
            "": {
              templateUrl: './templates/editDocumentItem.html', 
              controller: "editDocumentItemCtrl",
            }
        }
      })
      .state('stope-pdv-a', {
        url: '/stope-pdv-a?pdvId',
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
.service('prijemniDokumentiService', require('./prijemni-dokumentiService.js'))
.service('stavkeDokumenataService', require('./stavke-dokumenataService.js'))
.service('robneKarticeService', require('./robne-karticeService.js'))
.service('analitikaService', require('./analitikaService.js'));

myApp
.run(require('./run.js'));



