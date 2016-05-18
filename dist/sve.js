(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
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
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/faktura").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],4:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/grupa_roba").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],5:[function(require,module,exports){
var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection']);
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
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/magacin").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],7:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/jedinica_mere").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],8:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };

		  $scope.gridOptions.columnDefs = [
		    { name:'Id', width:'20%', displayName:'Id'},
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv'},
		    { name:'Postansk__broj_Mesto', width:'30%', displayName: 'Poštanski broj'}, 
		  ];

		$http.get("http://localhost:61769/api/mesto").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],9:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/pdv").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],10:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 
		 $scope.gridOptions.columnDefs = [
		    { name:'Id_Poslovna_godina', width:'15%', displayName:'Id'},
		    { name:'Godina_Poslovna_godina', width:'25%', displayName: 'Poslovna godina'},
		    { name:'Zakljucena_Poslovna_godina', width:'15%', displayName: 'Zaključena'},
		    { name:'Preduzece.Naziv_Preduzece', width:'45%', displayName: 'Preduzećes'},
		  ];

		$http.get("http://localhost:61769/api/poslovna_godina").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],11:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 
		 $scope.gridOptions.columnDefs = [
		    { name:'Id_Partner', width:'5%', displayName:'Id'},
		    { name:'Naziv_Partner', width:'15%', displayName: 'Partner'},
		    { name:'Tip_Partner', width:'15%', displayName: 'Tip partnera'},
		    { name:'Maticni_broj_Partner', width:'15%', displayName: 'Matični broj'},
		    { name:'PIB_Partner', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Partner', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto' },
		  ];

		$http.get("http://localhost:61769/api/poslovni_partner").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],12:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
		    { name:'Id_Preduzece', width:'10%', displayName:'Id'},
		    { name:'Naziv_Preduzece', width:'20%', displayName: 'Naziv'},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Maticni broj'},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'20%', displayName: 'Mesto' },
		  ];

		$http.get("http://localhost:61769/api/preduzece").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],13:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/prijemni_dokument").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],14:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/roba").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],15:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/robna_kartica").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],16:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/stavka_dokumenta").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}],17:[function(require,module,exports){
module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/stopa_pdva").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];
},{}]},{},[5]);
