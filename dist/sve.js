(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
 		 	{ name:'Robna_kartica.Magacin.Naziv_Magacin', width:'20%', displayName: 'Magacin'},
		    { name:'Redni_broj_Analitika_magacinske_kartice', width:'20%', displayName: 'Rbr.'},
		    { name:'Smer_Analitika_magacinske_kartice', width:'20%', displayName: 'Smer'},
		    { name:'Kolicina_Analitika_magacinske_kartice', width:'20%', displayName: 'Ukupna kolicina'},
		    { name:'Cena_Analitika_magacinske_kartice', width:'20%', displayName: 'Cena'}
		  ];

		$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
        	$scope.gridOptions.data = response.data;
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
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner'},
		    { name:'Poslovna_godina.Godina_Poslovna_godina', width:'20%', displayName: 'Poslovna godina'},
		    { name:'Datum_fakture_Faktura', width:'20%', displayName: 'Datum fakture'},
		    { name:'Datum_valute_Faktura', width:'20%', displayName: 'Valuta fakture'},
		    { name:'Ukupno_za_placanje_Faktura', width:'20%', displayName: 'Ukupno za placanje'}
		  ];

		$http.get("http://localhost:61769/api/faktura").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],4:[function(require,module,exports){
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
		    { name:'Naziv_Grupa_roba', width:'75%', displayName:'Naziv'},
		    { name:'PDV.Naziv_PDV', width:'25%', displayName: 'Po PDV'}
		];

		$http.get("http://localhost:61769/api/grupa_roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
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


myApp
.service('mestaService', require('./mestaService.js'))
.service('preduzecaService', require('./preduzecaService.js'));

},{"./analitikaController.js":1,"./documentsListController.js":2,"./faktureController.js":3,"./grupe-robaController.js":4,"./magaciniController.js":6,"./merne-jediniceController.js":7,"./mestaController.js":8,"./mestaService.js":9,"./pdvController.js":10,"./poslovne-godineController.js":11,"./poslovni-partneriController.js":12,"./preduzecaService.js":13,"./preduzeceController.js":14,"./prijemni-dokumentiController.js":15,"./robaController.js":16,"./robne-karticeController.js":17,"./stavke-dokumenataController.js":18,"./stope-pdv-aController.js":19}],6:[function(require,module,exports){
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
		    { name:'Naziv_Magacin', width:'35%', displayName:'Naziv magacina'},
		    { name:'Mesto.Naziv_Mesto', width:'30%', displayName: 'Mesto'},
		    { name:'Adresa_Magacin', width:'35%', displayName:'Adresa'}
		];

		$http.get("http://localhost:61769/api/magacin").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],7:[function(require,module,exports){
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
		    { name:'Naziv_Jedinica_mere', width:'100%', displayName:'Naziv'}
		];

		$http.get("http://localhost:61769/api/jedinica_mere").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],8:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'mestaService', '$routeParams','$window',
	function myController($scope, $http, mestaService,$routeParams, $window){

		$scope.placeId = -1;
		$scope.placeName = "";
		$scope.placeNumber = "00000";

		$scope.placeUrl = "";
		$scope.selectedPlaceId = "-1";
		$scope.selectedPlaceName="";
		$scope.selectedPlaceNumber="";
		$scope.selectedRow = {};
		$scope.editName="";
		$scope.editNumber = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };

		  $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv'},
		    { name:'Postansk__broj_Mesto', width:'50%', displayName: 'Poštanski broj'}, 
		  ];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedPlaceId = $scope.selectedRow.Id;
   				$scope.selectedPlaceName = $scope.selectedRow.Naziv_Mesto;
   				$scope.selectedPlaceNumber = $scope.selectedRow.Postansk__broj_Mesto;
   				$scope.editName = $scope.selectedPlaceName;
   				$scope.editNumber = $scope.selectedPlaceNumber;
		  });
   		};

		
		function fillData(){
    		mestaService.get_all_places()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		}

		
		fillData();


		$scope.add_place = function()
		{
			mestaService.create_place($scope.placeId, $scope.placeName, $scope.placeNumber).then(function(response){
				$window.location.reload();
			});
		};

		$scope.remove_selected_place = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			mestaService.remove_place($scope.selectedRow[0].Id).then(function(response){
				console.log(response);
				$window.location.reload();
			});
		};

		$scope.edit_selected_place = function(name, number)
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("Promenjeno: "+$scope.selectedRow[0].Id+","+name+", "+number);
			mestaService.update_place($scope.selectedRow[0].Id, name, number).then(function(response){
				$window.location.reload();
			});
		};



	}
];
},{}],9:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function mestaService($http, $window, $q){

		function get_all_places()
		{
			var resUrl = "http://localhost:61769/api/mesto";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function get_place(placeId)
		{
			return "TODO TODO TODO TODO TODOOOOO";
		}

		function create_place(placeId, placeName, placeNumber)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/mesto",
                    data: {
						Id: placeId, 
						Naziv_Mesto: placeName,
						Postansk__broj_Mesto: placeNumber
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_place(placeId)
		{
			var urlDelete = "http://localhost:61769/api/mesto/"+placeId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_place(placeId, placeName, placeNumber)
		{
			var url = "http://localhost:61769/api/mesto/"+placeId+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id: placeId, 
						Naziv_Mesto: placeName,
						Postansk__broj_Mesto: placeNumber
					}
           	}).then(function(response){
				return response.data;				
			});
		}



		return {
			get_all_places: get_all_places,
			get_place: get_place,
			create_place: create_place,
			remove_place: remove_place,
			update_place: update_place,
		};


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
		    { name:'Naziv_PDV', width:'75%', displayName: 'Naziv'}
		];

		$http.get("http://localhost:61769/api/PDV").then(function(response) {
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
		    { name:'Godina_Poslovna_godina', width:'25%', displayName: 'Poslovna godina'},
		    { name:'Zakljucena_Poslovna_godina', width:'25%', displayName: 'Zaključena'},
		    { name:'Preduzece.Naziv_Preduzece', width:'50%', displayName: 'Preduzeće'},
		  ];

		$http.get("http://localhost:61769/api/poslovna_godina").then(function(response) {
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
		    { name:'Naziv_Partner', width:'15%', displayName: 'Partner'},
		    { name:'Tip_Partner', width:'15%', displayName: 'Tip partnera'},
		    { name:'Maticni_broj_Partner', width:'15%', displayName: 'Matični broj'},
		    { name:'PIB_Partner', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Partner', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'20%', displayName: 'Mesto' },
		  ];

		$http.get("http://localhost:61769/api/poslovni_partner").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],13:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function preduzecaService($http, $window, $q){

		function get_all_companies()
		{
			var resUrl = "http://localhost:61769/api/preduzece";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_company(id, name, mbr, pib, address, place)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/preduzece",
                    data: {
						Id_Preduzece: id, 
						Id: place,
						Naziv_Preduzece: name,
						Maticni_broj_Preduzece: mbr,
						PIB_Preduzece: pib,
						Adresa_Preduzece: address
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_companies: get_all_companies,
			create_company: create_company,
		};

	}
];
},{}],14:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'preduzecaService','mestaService', '$routeParams','$window',
	function myController($scope, $http, preduzecaService, mestaService, $routeParams, $window){

		$scope.companyId =-1;
		$scope.companyName ="";
		$scope.companyMBR = "";
		$scope.companyPIB = "";
		$scope.companyAddress="";
		$scope.companyPlace= "";
		$scope.allPlaces = {};



		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Preduzece', width:'25%', displayName: 'Naziv'},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Maticni broj'},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'25%', displayName: 'Mesto' }
		  ];

    	function fillData(){
    		preduzecaService.get_all_companies()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		}

		fillData();

		$scope.add_company = function()
		{
			//console.log("Uneto "+$scope.companyId+", "+$scope.companyName+", "+$scope.companyMBR+", "+$scope.companyPIB);
			//console.log("Adresa i mesto "+$scope.companyAddress+", "+$scope.companyPlace);

			console.log("Odabrano mesto sa id "+$scope.check);
			preduzecaService.create_company($scope.companyId, $scope.companyName, $scope.companyMBR, $scope.companyPIB, $scope.companyAddress, $scope.check).then(function(response){
				$window.location.reload();
			});


		};

		$scope.check = "";

		$scope.chose_place = function()
		{	
		};



	}
];
},{}],15:[function(require,module,exports){
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
 			//Koji je magacin za sta? xD
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Magacin1.Naziv_Magacin', width:'20%', displayName: 'Odeljenje'},
		    { name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Magacin'},
		    { name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner'},
		    { name:'Redni_broj_Prijemni_dokument', width:'10%', displayName: 'Redni broj'},
		    { name:'Datum_formiranja_Prijemni_dokument', width:'20%', displayName: 'Datum formiranja'},
		    { name:'Ukupna_vrednost_Prijemni_dokument', width:'10%', displayName: 'Ukupna vrednost'}
		  ];

		$http.get("http://localhost:61769/api/prijemni_dokument").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],16:[function(require,module,exports){
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
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv'},
			{ name:'Jedinica_mere.Naziv_Jedinica_mere', width:'15%', displayName:'Jedinica mere'},
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'20%', displayName: 'Grupa'}
		];

		$http.get("http://localhost:61769/api/roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],17:[function(require,module,exports){
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
		    { name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Magacin'},
		    { name:'Roba.Naziv_Roba', width:'20%', displayName:'Roba'},
		    { name:'Poslovna_godina.Godina_Poslovna_godina', width:'10%', displayName: 'Poslovna godina'},
		    { name:'Ukupna_kolicina_Robna_kartica', width:'20%', displayName: 'Ukupna kolicina'},
		    { name:'Roba.Jedinica_mere.Naziv_Jedinica_mere', width:'10%', displayName: 'Merna jedinica'},
		    { name:'Ukupna_vrednost_Robna_kartica', width:'20%', displayName: 'Ukupna vrednost' }
		  ];

		$http.get("http://localhost:61769/api/robna_kartica").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],18:[function(require,module,exports){
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
 		 	{ name:'Prijemni_dokument.Magacin1.Naziv_Magacin', width:'20%', displayName: 'Odeljenje'},
		    { name:'Prijemni_dokument.Redni_broj_Prijemni_dokument', width:'20%', displayName: 'Rbr prijemnog dok.'},
		    { name:'Roba.Naziv_Roba', width:'20%', displayName: 'Naziv robe'},
		    { name:'Kolicina_Stavka_dokumenta', width:'10%', displayName: 'Kolicina'},
		    { name:'Roba.Jedinica_mere.Naziv_Jedinica_mere', width:'20%', displayName: 'Mera'},
		    { name:'Ukupna_vrednost_Stavka_dokumenta', width:'10%', displayName: 'Ukupna vrednost'}
		  ];

		$http.get("http://localhost:61769/api/stavka_dokumenta").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],19:[function(require,module,exports){
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
			{ name:'PDV.Naziv_PDV', width:'30%', displayName: 'Za PDV'},
		    { name:'Stopa_Stopa_PDV_a', width:'35%', displayName: 'Stopa'},
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Vazi od'}
		];

		$http.get("http://localhost:61769/api/stopa_pdva").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}]},{},[5]);
