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
 		 	{ name:'Robna_kartica.Magacin.Naziv_Magacin', width:'30%', displayName: 'Magacin'},
		    { name:'Redni_broj_Analitika_magacinske_kartice', width:'10%', displayName: 'Rbr.'},
		    { name:'Smer_Analitika_magacinske_kartice', width:'15%', displayName: 'Smer'},
		    { name:'Kolicina_Analitika_magacinske_kartice', width:'20%', displayName: 'Ukupna količina'},
		    { name:'Cena_Analitika_magacinske_kartice', width:'25%', displayName: 'Cena'}
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
 		 	{ name:'Poslovni_partner.Naziv_Partner', width:'25%', displayName: 'Partner'},
		    { name:'Poslovna_godina.Godina_Poslovna_godina', width:'10%', displayName: 'Poslovna godina'},
		    { name:'Datum_fakture_Faktura', width:'20%', displayName: 'Datum fakture'},
		    { name:'Datum_valute_Faktura', width:'20%', displayName: 'Datum valute'},
		    { name:'Ukupno_za_placanje_Faktura', width:'25%', displayName: 'Ukupno za plaćanje'}
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
var myApp = angular.module('preduzeceApp',['ngRoute', 'ui.bootstrap', 'ui.grid', 'ui.grid.selection', 'ui.grid.resizeColumns']);
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
.service('preduzecaService', require('./preduzecaService.js'))
.service('merneJediniceService', require('./merne-jediniceService.js'))
.service('pdvService', require('./pdvService.js'))
.service('poslovneGodineService', require('./poslovne-godineService.js'))
.service('stopePDVService', require('./stope-pdv-aService.js'));

},{"./analitikaController.js":1,"./documentsListController.js":2,"./faktureController.js":3,"./grupe-robaController.js":4,"./magaciniController.js":6,"./merne-jediniceController.js":7,"./merne-jediniceService.js":8,"./mestaController.js":9,"./mestaService.js":10,"./pdvController.js":11,"./pdvService.js":12,"./poslovne-godineController.js":13,"./poslovne-godineService.js":14,"./poslovni-partneriController.js":15,"./preduzecaService.js":16,"./preduzeceController.js":17,"./prijemni-dokumentiController.js":18,"./robaController.js":19,"./robne-karticeController.js":20,"./stavke-dokumenataController.js":21,"./stope-pdv-aController.js":22,"./stope-pdv-aService.js":23}],6:[function(require,module,exports){
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
	'$scope', '$http','merneJediniceService', '$routeParams','$window',
	function myController($scope, $http, merneJediniceService, $routeParams, $window){

		$scope.measUnitId = -1;
		$scope.measUnitName ="";

		$scope.selectedRow =  {};
   		$scope.selectedMeasUnitId = -1;
   		$scope.selectedMeasUnitName = "";

   		$scope.editMeasUnitName = "";

		
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

    	$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedMeasUnitId = $scope.selectedRow.Id_Jedinica_mere;
   				$scope.selectedMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;

   				$scope.editMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;
   			});
   		};


    	function fillData(){
    		merneJediniceService.get_all_measUnits().then(function(response){
    			$scope.gridOptions.data = response;
    		});
    	};

    	fillData();



    	$scope.add_measUnit = function(){
    		merneJediniceService.add_measUnit($scope.measUnitId, $scope.measUnitName).then(function(response){
    			$window.location.reload();
    		});
    	};

    	$scope.remove_selected_measUnit = function()
    	{
    		$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
    		merneJediniceService.remove_measUnit($scope.selectedRow[0].Id_Jedinica_mere).then(function(response){
    			$window.location.reload();
    		});
    	};

    	$scope.edit_selected_measUnit = function(name)
    	{
    		merneJediniceService.update_measUnit($scope.selectedMeasUnitId, name).then(function(response){
    			$window.location.reload();
    		});
    	};

	}
];
},{}],8:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function merneJediniceService($http, $window, $q){


		function get_all_measUnits()
		{
			var resUrl = "http://localhost:61769/api/jedinica_mere";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function add_measUnit(id, name)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/jedinica_mere",
                    data: {
						Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_measUnit(id)
		{
			var urlDelete = "http://localhost:61769/api/jedinica_mere/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_measUnit(id, name)
		{
			var url = "http://localhost:61769/api/jedinica_mere/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_measUnits: get_all_measUnits,
			add_measUnit: add_measUnit,
			remove_measUnit: remove_measUnit,
			update_measUnit: update_measUnit,
		};

	}
];
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
module.exports = [
	'$scope', '$http','pdvService', '$routeParams','$window',
	function myController($scope, $http, pdvService, $routeParams, $window){

		$scope.pdvId = -1;
		$scope.pdvName = "";

		$scope.selectedRow = {};
		$scope.selectedPdvId = -1;
		$scope.selectedPdvName = "";

		$scope.editPdvName = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_PDV', width:'100%', displayName: 'Naziv'}
		];

    	$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;
   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedPdvId = $scope.selectedRow.Id_PDV;
   				$scope.selectedPdvName = $scope.selectedRow.Naziv_PDV;
   				$scope.editPdvName = $scope.selectedRow.Naziv_PDV;
		  	});
   		};

   		function fillData(){
    		pdvService.get_all_pdvs()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		};

		fillData();

		$scope.add_pdv = function()
		{
			pdvService.create_pdv($scope.pdvId, $scope.pdvName).then(function(response){
				$window.location.reload();
			});
		};

		$scope.remove_selected_pdv = function()
		{
			pdvService.remove_pdv($scope.selectedPdvId).then(function(response){
				$window.location.reload();
			});
		};

		$scope.edit_selected_pdv = function(name)
		{
			pdvService.update_pdv($scope.selectedPdvId, name).then(function(response){
				$window.location.reload();
			});
		};
	}
];
},{}],12:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function pdvService($http, $window, $q){

		function get_all_pdvs()
		{
			var resUrl = "http://localhost:61769/api/PDV";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function create_pdv(id, name)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/PDV",
                    data: {
						Id_PDV: id, 
						Naziv_PDV: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		function remove_pdv(id)
		{
			var urlDelete = "http://localhost:61769/api/PDV/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_pdv(id, name)
		{
			var url = "http://localhost:61769/api/PDV/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_PDV: id, 
						Naziv_PDV: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_pdvs: get_all_pdvs,
			remove_pdv: remove_pdv, 
			create_pdv: create_pdv,
			update_pdv: update_pdv,
		};
	}

];
},{}],13:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'poslovneGodineService', 'preduzecaService', '$routeParams','$window',
	function myController($scope, $http, poslovneGodineService, preduzecaService, $routeParams, $window){

		$scope.businessYearId = -1;
		$scope.businessYear = 0;
		$scope.businessYearFinished = 0;
		$scope.businessYearCompany="";
		$scope.changeCompany = "";

		$scope.allCompanies = {};

		$scope.selectedRow = {};
		$scope.selectedBusinessYearId = -1;
   		$scope.selectedBusinessYear = 0;
   		$scope.selectedBusinessYearFinished = 0;
   		$scope.selectedBusinessYearCompany = "";

   		$scope.editBusinessYear = 0;
   		$scope.editBusinessYearFinished = 0;
   		$scope.editBusinessYearCompany = 0;
	
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


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedBusinessYearId = $scope.selectedRow.Id_Poslovna_godina;
   				$scope.selectedBusinessYear = $scope.selectedRow.Godina_Poslovna_godina;
   				$scope.selectedBusinessYearFinished = $scope.selectedRow.Zakljucena_Poslovna_godina;
   				$scope.selectedBusinessYearCompany = $scope.selectedRow.Preduzece.Id_Preduzece;

   				$scope.editBusinessYear = $scope.selectedRow.Godina_Poslovna_godina;
   				$scope.editBusinessYearFinished = $scope.selectedRow.Zakljucena_Poslovna_godina;
   				$scope.editBusinessYearCompany = $scope.selectedRow.Preduzece.Id_Preduzece;

		 	});
   		};

    	function fillData()
    	{
    		poslovneGodineService.get_all_businessYears()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			preduzecaService.get_all_companies()
				.then(function(response){
				$scope.allCompanies = response;
			});
    	};

    	fillData();

    	$scope.add_businessYear = function()
    	{
    		poslovneGodineService.create_businessYear($scope.businessYearId, $scope.businessYear, $scope.businessYearFinished, $scope.businessYearCompany).then(function(response){
				$window.location.reload();
			});
    	};

    	$scope.remove_selected_businessYear = function()
    	{
    		poslovneGodineService.remove_businessYear($scope.selectedBusinessYearId).then(function(response){
				$window.location.reload();
			});
    	};


    	$scope.edit_selected_businessYear = function()
    	{
    		console.log("Saljemo "+$scope.selectedBusinessYearId+", "+$scope.editBusinessYear+", "+$scope.editBusinessYearFinished+","+$scope.editBusinessYearCompany);
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
				$window.location.reload();
			});
    	}

	}
];
},{}],14:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function poslovneGodineService($http, $window, $q){

		function get_all_businessYears()
		{
			var resUrl = "http://localhost:61769/api/poslovna_godina";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_businessYear(id, godina, zakljucena, preduzece)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/poslovna_godina",
                    data: {
						Id_Poslovna_godina: id, 
						Id_Preduzece: preduzece,
						Godina_Poslovna_godina: godina,
						Zakljucena_Poslovna_godina: zakljucena
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_businessYear(id)
		{
			var urlDelete = "http://localhost:61769/api/poslovna_godina/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_businessYear(id, godina, zakljucena, preduzece)
		{	
			var url = "http://localhost:61769/api/poslovna_godina/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Poslovna_godina: id, 
						Id_Preduzece: preduzece,
						Godina_Poslovna_godina: godina,
						Zakljucena_Poslovna_godina: zakljucena
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_businessYears: get_all_businessYears, 
			create_businessYear: create_businessYear, 
			update_businessYear: update_businessYear, 
			remove_businessYear: remove_businessYear,
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
},{}],16:[function(require,module,exports){
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

		function remove_company(companyId)
		{
			var urlDelete = "http://localhost:61769/api/preduzece/"+companyId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_company(id, name, mbr, pib, address, place)
		{
			var url = "http://localhost:61769/api/preduzece/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
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
			remove_company: remove_company,
			update_company: update_company, 
		};

	}
];
},{}],17:[function(require,module,exports){
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
		$scope.check = "";
		$scope.changePlace = "";


		$scope.selectedRow =  {};
   		$scope.selectedCompanyId = -1;
   		$scope.selectedCompanyName = "";
   		$scope.selectedCompanyMBR = "";
   		$scope.selectedCompanyPIB = "";
   		$scope.selectedCompanyAddress ="";
   		$scope.selectedCompanyPlace ="";

   	
   		$scope.editCompanyName = "";
   		$scope.editCompanyMBR = "";
   		$scope.editCompanyPIB = "";
   		$scope.editCompanyAddress ="";
   		$scope.editCompanyPlace ="";




		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Preduzece', width:'25%', displayName: 'Naziv'},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Matični broj'},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'25%', displayName: 'Mesto' }
		];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedCompanyId = $scope.selectedRow.Id_Preduzece;
   				$scope.selectedCompanyName = $scope.selectedRow.Naziv_Preduzece;
   				$scope.selectedCompanyMBR = $scope.selectedRow.Maticni_broj_Preduzece;
   				$scope.selectedCompanyPIB = $scope.selectedRow.PIB_Preduzece;
   				$scope.selectedCompanyAddress = $scope.selectedRow.Adresa_Preduzece;
   				$scope.selectedCompanyPlace = $scope.selectedRow.Mesto.Id;

   				$scope.editCompanyName = $scope.selectedRow.Naziv_Preduzece;
   				$scope.editCompanyMBR = $scope.selectedRow.Maticni_broj_Preduzece;
   				$scope.editCompanyPIB = $scope.selectedRow.PIB_Preduzece;
   				$scope.editCompanyAddress = $scope.selectedRow.Adresa_Preduzece;
   				$scope.editCompanyPlace = $scope.selectedRow.Mesto.Id;

		  });
   		};

		

    	function fillData(){
    		preduzecaService.get_all_companies()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		};

		fillData();

		$scope.add_company = function()
		{
			preduzecaService.create_company($scope.companyId, $scope.companyName, $scope.companyMBR, $scope.companyPIB, $scope.companyAddress, $scope.check).then(function(response){
				$window.location.reload();
			});
		};

	
		$scope.remove_selected_company = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("ID preduzeca je "+$scope.selectedRow[0].Id_Preduzece);
			preduzecaService.remove_company($scope.selectedRow[0].Id_Preduzece).then(function(response){
				$window.location.reload();
			});
		};


		$scope.edit_selected_company = function(id, name, mbr, pib, address, place)
		{
			console.log("Promenjeno: "+id+", "+name+", "+mbr+", "+pib+", "+address+", "+place);
			preduzecaService.update_company(id, name, mbr, pib, address, place).then(function(response){
				$window.location.reload();
			});
		};

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
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv'},
			{ name:'Jedinica_mere.Naziv_Jedinica_mere', width:'20%', displayName:'Jedinica mere'},
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'30%', displayName: 'Grupa'}
		];

		$http.get("http://localhost:61769/api/roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],20:[function(require,module,exports){
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
		    { name:'Ukupna_kolicina_Robna_kartica', width:'20%', displayName: 'Ukupna količina'},
		    { name:'Roba.Jedinica_mere.Naziv_Jedinica_mere', width:'10%', displayName: 'Merna jedinica'},
		    { name:'Ukupna_vrednost_Robna_kartica', width:'20%', displayName: 'Ukupna vrednost' }
		  ];

		$http.get("http://localhost:61769/api/robna_kartica").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],21:[function(require,module,exports){
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
		    { name:'Kolicina_Stavka_dokumenta', width:'10%', displayName: 'Količina'},
		    { name:'Roba.Jedinica_mere.Naziv_Jedinica_mere', width:'20%', displayName: 'Mera'},
		    { name:'Ukupna_vrednost_Stavka_dokumenta', width:'10%', displayName: 'Ukupna vrednost'}
		  ];

		$http.get("http://localhost:61769/api/stavka_dokumenta").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],22:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'stopePDVService', 'pdvService','$routeParams','$window',
	function myController($scope, $http, stopePDVService, pdvService, $routeParams, $window){
		

		$scope.pdvRateId = -1;
		$scope.pdvRate = 0.00;
		$scope.pdvRateDate = "";
		$scope.pdvRatePdv=0;

		$scope.allPDVs = {};

		$scope.selectedPdvRateId = -1;
		$scope.selectedPdvRate = 0.00;
		$scope.selectedPdvRateDate = "";
		$scope.selectedPdvRatePdv=0;


		$scope.editPdvRate = 0.00;
		$scope.editPdvRateDate = "";
		$scope.editPdvRatePdv=0;


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
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Važi od'}
		];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				$scope.selectedPdvRateId = $scope.selectedRow.Id_Stopa_PDV_a;
				$scope.selectedPdvRate = $scope.selectedRow.Stopa_Stopa_PDV_a;
				$scope.selectedPdvRateDate = $scope.selectedRow.Datum_vazenja_Stopa_PDV_a;
				$scope.selectedPdvRatePdv= $scope.selectedRow.Id_PDV;


				$scope.editPdvRate = $scope.selectedPdvRate;
				$scope.editPdvRateDate = $scope.selectedPdvRateDate;
				$scope.editPdvRatePdv=$scope.selectedPdvRatePdv;

   			  });
   		};

    	function fillData()
    	{
    		stopePDVService.get_all_PDVRates().then(function(response){
    			$scope.gridOptions.data = response;
    		});

    		pdvService.get_all_pdvs().then(function(response){
    			$scope.allPDVs = response;
    		});
    	};

    	fillData();

    	$scope.add_PDVRate = function()
    	{
    		var god = $scope.dt.getYear()+1900;
    		var m = $scope.dt.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.dt.getDate();
    		console.log("DATUM "+date);
    		console.log("Uneto "+$scope.pdvRateId+", "+$scope.pdvRate+", "+date+", "+$scope.pdvRatePdv);
    		stopePDVService.create_pdvRate($scope.pdvRateId, $scope.pdvRate, date, $scope.pdvRatePdv).then(function(response){
    			$window.location.reload();
    		});
    	};

    	$scope.remove_PDVRate = function()
    	{
    		stopePDVService.remove_pdvRate($scope.selectedPdvRateId).then(function(response){
    			$window.location.reload();
    		});
    	};


    	$scope.edit_PDVRate = function()
    	{
       		var god = $scope.editPdvRateDate.getYear()+1900;
    		var m = $scope.editPdvRateDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editPdvRateDate.getDate();
    		stopePDVService.update_pdvRate($scope.selectedPdvRateId, $scope.editPdvRate, date ,$scope.editPdvRatePdv).then(function(response){
    			$window.location.reload();
    		});
    	};



    	// time picker
  		 $scope.mytime = new Date();
  		 $scope.options = {
    		hour_step: [1, 2, 3],
    		minute_step: [1, 5, 10, 15, 25, 30]
  		};

 		 $scope.hour_step = 1;
 		 $scope.minute_step = 15;
 		 $scope.ismeridian = true;

		// date picker
 		$scope.open1 = function() {
    	$scope.popup1.opened = true;
  		};
  		
  		$scope.today = function(){
  			$scope.dt = new Date();
  		}

 		$scope.minDate =  new Date();

 		$scope.today();
  		$scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 		$scope.format = $scope.formats[0];
 		

 		 $scope.popup1 = {
    		opened: false
 		 };

  		$scope.dateOptions = {
    		formatYear: 'yy',
    		startingDay: 1
  		};

 		$scope.altInputFormats = ['yyyy/MM/dd'];

 		 $scope.setDate = function(year, month, day) {
    		$scope.dt = new Date(year, month, day);
  		};

  		$scope.dateChanged = function() {
			console.log("Date chenged function "+$scope.dt.getMonth() +" "+$scope.dt.getDate());
			console.log("ODABRANO VREME "+$scope.dt);
		}


	}
];
},{}],23:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function stopePDVService($http, $window, $q){

		function get_all_PDVRates()
		{
			var resUrl = "http://localhost:61769/api/stopa_pdva";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_pdvRate(id, rate, date, pdvId)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/stopa_pdva",
                    data: {
						Id_Stopa_PDV_a: id, 
						Id_PDV: pdvId,
						Stopa_Stopa_PDV_a: rate,
						Datum_vazenja_Stopa_PDV_a: date
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_pdvRate(id)
		{
			var urlDelete = "http://localhost:61769/api/stopa_pdva/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_pdvRate(id, rate, date, pdvId)
		{
			var url = "http://localhost:61769/api/stopa_pdva/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Stopa_PDV_a: id, 
						Id_PDV: pdvId,
						Stopa_Stopa_PDV_a: rate,
						Datum_vazenja_Stopa_PDV_a: date
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		return {
			get_all_PDVRates: get_all_PDVRates,
			create_pdvRate: create_pdvRate, 
			remove_pdvRate: remove_pdvRate,
			update_pdvRate: update_pdvRate,
		};

	}
];
},{}]},{},[5]);
