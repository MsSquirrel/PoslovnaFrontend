(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/mesto").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],2:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){

	}
];
},{}],3:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],4:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],5:[function(require,module,exports){
var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid']);
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
      when('/mesta', {
        templateUrl: './templates/mesta.html',
        controller: 'mestaCtrl'
      }).
      when('/preduzeca', {
        templateUrl: './templates/preduzeca.html',
        controller: 'preduzeceCtrl'
      }).
      when('/analitika', {
        templateUrl: './templates/analitika.html',
        controller: 'analitikaCtrl'
      }).
      when('/fakture', {
        templateUrl: './templates/fakture.html',
        controller: 'faktureCtrl'
      }).
      when('/grupe-roba', {
        templateUrl: './templates/grupe-roba.html',
        controller: 'grupe-robaCtrl'
      }).
      when('/magacini', {
        templateUrl: './templates/magacini.html',
        controller: 'magaciniCtrl'
      }).
      when('/merne-jedinice', {
        templateUrl: './templates/merne-jedinice.html',
        controller: 'merne-jediniceCtrl'
      }).
      when('/pdv', {
        templateUrl: './templates/pdv.html',
        controller: 'pdvCtrl'
      }).
      when('/poslovne-godine', {
        templateUrl: './templates/poslovne-godine.html',
        controller: 'poslovne-godineCtrl'
      }).
      when('/poslovni-partneri', {
        templateUrl: './templates/poslovni-partneri.html',
        controller: 'poslovni-partneriCtrl'
      }).
      when('/prijemni-dokumenti', {
        templateUrl: './templates/prijemni-dokumenti.html',
        controller: 'prijemni-dokumentiCtrl'
      }).
      when('/roba', {
        templateUrl: './templates/roba.html',
        controller: 'robaCtrl'
      }).
      when('/robne-kartice', {
        templateUrl: './templates/robne-kartice.html',
        controller: 'robne-karticeCtrl'
      }).
      when('/stavke-dokumenata', {
        templateUrl: './templates/stavke-dokumenata.html',
        controller: 'stavke-dokumenataCtrl'
      }).
      when('/stope-pdv-a', {
        templateUrl: './templates/stope-pdv-a.html',
        controller: 'stope-pdv-aCtrl'
      }).
      otherwise({
      	redirectTo: '/main'
      });

}]);

},{"./analitikaController.js":1,"./documentsListController.js":2,"./faktureController.js":3,"./grupe-robaController.js":4,"./magaciniController.js":6,"./merne-jediniceController.js":7,"./mestaController.js":8,"./pdvController.js":9,"./poslovne-godineController.js":10,"./poslovni-partneriController.js":11,"./preduzeceController.js":12,"./prijemni-dokumentiController.js":13,"./robaController.js":14,"./robne-karticeController.js":15,"./stavke-dokumenataController.js":16,"./stope-pdv-aController.js":17}],6:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],7:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],8:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],9:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],10:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],11:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],12:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/preduzece").then(function(response) {
        	$scope.preduzeca = response.data;
    	});

	}
];
},{}],13:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],14:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],15:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],16:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],17:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}]},{},[5]);
