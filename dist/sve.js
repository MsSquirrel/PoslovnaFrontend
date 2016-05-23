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
		    { name:'Datum_fakture_Faktura', width:'20%', displayName: 'Datum fakture', cellFilter: 'date:\'dd.MM.yyyy\''},
		    { name:'Datum_valute_Faktura', width:'20%', displayName: 'Datum valute', cellFilter: 'date:\'dd.MM.yyyy\''},
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
myApp.filter('true_false', function() {
    return function(text, length, end) {
        if (text) {
            return 'Da';
        }
        return 'Ne';
    }
});

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
.service('stopePDVService', require('./stope-pdv-aService.js'))
.service('partneriService', require('./poslovni-partneriService.js'))
.service('robaService', require('./robaService.js'))
.service('magaciniService', require('./magaciniService.js'));

},{"./analitikaController.js":1,"./documentsListController.js":2,"./faktureController.js":3,"./grupe-robaController.js":4,"./magaciniController.js":6,"./magaciniService.js":7,"./merne-jediniceController.js":8,"./merne-jediniceService.js":9,"./mestaController.js":10,"./mestaService.js":11,"./pdvController.js":12,"./pdvService.js":13,"./poslovne-godineController.js":14,"./poslovne-godineService.js":15,"./poslovni-partneriController.js":16,"./poslovni-partneriService.js":17,"./preduzecaService.js":18,"./preduzeceController.js":19,"./prijemni-dokumentiController.js":20,"./robaController.js":21,"./robaService.js":22,"./robne-karticeController.js":23,"./stavke-dokumenataController.js":24,"./stope-pdv-aController.js":25,"./stope-pdv-aService.js":26}],6:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'magaciniService', 'mestaService', 'preduzecaService', '$routeParams','$window',
	function myController($scope, $http, magaciniService, mestaService, preduzecaService, $routeParams, $window){
		
		$scope.warehouseId = -1;
		$scope.warehouseName = "";
		$scope.warehouseAddress = "";
		$scope.warehousePlace = "";
		$scope.warehouseCompany = "";
		$scope.allPlaces = {};
		$scope.allCompanies = {};

		$scope.selectedRow = {};
   		$scope.selectedWarehouseId = -1;
   		$scope.selectedWarehouseName = "";
   		$scope.selectedWarehouseAddress = "";
   		$scope.selectedWarehousePlace = "";
   		$scope.selectedWarehouseCompany ="";
   	
		$scope.editWarehouseName = "";
		$scope.editWarehouseAddress = "";
		$scope.editWarehousePlace = "";
		$scope.editWarehouseCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Magacin', width:'30%', displayName:'Naziv magacina'},
		    { name:'Adresa_Magacin', width:'35%', displayName:'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto'},
		    { name:'Preduzece.Naziv_Preduzece', width:'20%', displayName:'Preduzece'}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];

		   		$scope.selectedWarehouseId = $scope.selectedRow.Id_Magacin;
		   		$scope.selectedWarehouseName = $scope.selectedRow.Naziv_Magacin;
		   		$scope.selectedWarehouseAddress = $scope.selectedRow.Adresa_Magacin;
		   		$scope.selectedWarehousePlace = $scope.selectedRow.Mesto.Id;
		   		$scope.selectedWarehouseCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
   	
				$scope.editWarehouseName = $scope.selectedRow.Naziv_Magacin;
				$scope.editWarehouseAddress = $scope.selectedRow.Adresa_Magacin;
				$scope.editWarehousePlace = $scope.selectedRow.Mesto.Id;
				$scope.editWarehouseCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		  });
   		};

    	function fillData(){
    		magaciniService.get_all_warehouses().then(function(response){
				$scope.gridOptions.data = response;
			});

			mestaService.get_all_places().then(function(response){
				$scope.allPlaces = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		};

		fillData();

		$scope.add_warehouse = function()
		{
			magaciniService.create_warehouse($scope.warehouseId, $scope.warehouseName, $scope.warehouseAddress, $scope.warehousePlace, $scope.warehouseCompany).then(function(response){
				fillData();
			});
		};
	
		$scope.remove_selected_warehouse = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("ID magacina je "+$scope.selectedRow[0].Id_Magacin);
			magaciniService.remove_warehouse($scope.selectedRow[0].Id_Magacin).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_warehouse = function()
		{
			console.log("Promenjeno: "+$scope.selectedWarehouseId+", "+$scope.editWarehouseName+", "+$scope.editWaarehouseAddress+", "+$scope.editWaarehousePlace+", "+$scope.editWaarehouseCompany);
			magaciniService.update_warehouse($scope.selectedWarehouseId, $scope.editWarehouseName, $scope.editWaarehouseAddress, $scope.editWaarehousePlace, $scope.editWaarehouseCompany).then(function(response){
				fillData();
			});
		};
	}
];
},{}],7:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function magaciniService($http, $window, $q){

		function get_all_warehouses()
		{
			var resUrl = "http://localhost:61769/api/magacin";
			return $http.get(resUrl).then(function(response) {
				return response.data;
			});
		}

		function create_warehouse(id, name, address, place, company)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/magacin",
                    data: {
				   		Id_Magacin: id,
				   		Naziv_Magacin: name,
				   		Adresa_Magacin: address,
				   		Id: place,
				   		Id_Preduzece: company
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_warehouse(warehouseId)
		{
			var urlDelete = "http://localhost:61769/api/magacin/"+warehouseId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_warehouse(id, name, address, place, company)
		{
			var url = "http://localhost:61769/api/magacin/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
				   		Id_Magacin: id,
				   		Naziv_Magacin: name,
				   		Adresa_Magacin: address,
				   		Id: place,
				   		Id_Preduzece: company
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		return {
			get_all_warehouses: get_all_warehouses,
			create_warehouse: create_warehouse,
			remove_warehouse: remove_warehouse,
			update_warehouse: update_warehouse, 
		};

	}
];
},{}],8:[function(require,module,exports){
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
    			fillData();
    		});
    	};

    	$scope.remove_selected_measUnit = function()
    	{
    		$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
    		merneJediniceService.remove_measUnit($scope.selectedRow[0].Id_Jedinica_mere).then(function(response){
    			fillData();
    		});
    	};

    	$scope.edit_selected_measUnit = function(name)
    	{
    		merneJediniceService.update_measUnit($scope.selectedMeasUnitId, name).then(function(response){
    			fillData();
    		});
    	};

	}
];
},{}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
				fillData();
			});
		};

		$scope.remove_selected_place = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			mestaService.remove_place($scope.selectedRow[0].Id).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_place = function(name, number)
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			alert($scope.selectedRow);
			console.log("Promenjeno: "+$scope.selectedRow[0].Id+","+name+", "+number);
			mestaService.update_place($scope.selectedRow[0].Id, name, number).then(function(response){
				fillData();
			});
		};



	}
];
},{}],11:[function(require,module,exports){
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
},{}],12:[function(require,module,exports){
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
				fillData();
			});
		};

		$scope.remove_selected_pdv = function()
		{
			pdvService.remove_pdv($scope.selectedPdvId).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_pdv = function(name)
		{
			pdvService.update_pdv($scope.selectedPdvId, name).then(function(response){
				fillData();
			});
		};
	}
];
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
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
		    { name:'Zakljucena_Poslovna_godina', width:'25%', displayName: 'Zaključena', cellFilter: 'true_false'},
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
        fillData();
			});
    	};

    	$scope.remove_selected_businessYear = function()
    	{
    		poslovneGodineService.remove_businessYear($scope.selectedBusinessYearId).then(function(response){
				fillData();
			});
    	};


    	$scope.edit_selected_businessYear = function()
    	{
    		console.log("Saljemo "+$scope.selectedBusinessYearId+", "+$scope.editBusinessYear+", "+$scope.editBusinessYearFinished+","+$scope.editBusinessYearCompany);
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
				fillData();
			});
    	}

	}
];
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'partneriService','preduzecaService', 'mestaService','$routeParams','$window',
	function myController($scope, $http, partneriService, preduzecaService, mestaService, $routeParams, $window){
		
		$scope.partnerName ="";
		$scope.partnerMBR = "";
		$scope.partnerPIB = "";
		$scope.partnerAddress="";
		$scope.partnerPlace= "";
		$scope.allPlaces = {};
		$scope.checkPlace = "";
		$scope.changePlace = "";
		$scope.partnerType = "";
		$scope.changeType = "";
		$scope.checkType = "";
		$scope.partnerCompany = "";
		$scope.allCompanies = {};
		$scope.changeCompany = "";
		$scope.checkCompany = "";

		$scope.selectedRow =  {};
   		$scope.selectedPartnerId = -1;
   		$scope.selectedPartnerName = "";
   		$scope.selectedPartnerMBR = "";
   		$scope.selectedPartnerPIB = "";
   		$scope.selectedPartnerAddress ="";
   		$scope.selectedPartnerPlace ="";
   		$scope.selectedPartnerType = "";
   		$scope.selectedPartnerCompany = "";
   	
   		$scope.editPartnerName = "";
   		$scope.editPartnerMBR = "";
   		$scope.editPartnerPIB = "";
   		$scope.editPartnerAddress ="";
   		$scope.editPartnerPlace ="";
   		$scope.editPartnerType = "";
   		$scope.editPartnerCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 
		 $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Partner', width:'15%', displayName: 'Partner'},
		    { name:'Preduzece.Naziv_Preduzece', width:'15%', displayName: 'Preduzeću'},
		    { name:'Tip_Partner', width:'13%', displayName: 'Tip partnera'},
		    { name:'Maticni_broj_Partner', width:'13%', displayName: 'Matični broj'},
		    { name:'PIB_Partner', width:'14%', displayName: 'PIB'},
		    { name:'Adresa_Partner', width:'15%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto' },
		  ];

		  $scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedPartnerId = $scope.selectedRow.Id_Partner;
   				$scope.selectedPartnerName = $scope.selectedRow.Naziv_Partner;
   				$scope.selectedPartnerMBR = $scope.selectedRow.Maticni_broj_Partner;
   				$scope.selectedPartnerPIB = $scope.selectedRow.PIB_Partner;
   				$scope.selectedPartnerAddress = $scope.selectedRow.Adresa_Partner;
   				$scope.selectedPartnerPlace = $scope.selectedRow.Mesto.Id;
   				$scope.selectedPartnerCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
   				$scope.selectedPartnerType;

   				$scope.editPartnerName = $scope.selectedRow.Naziv_Partner;
   				$scope.editPartnerMBR = $scope.selectedRow.Maticni_broj_Partner;
   				$scope.editPartnerPIB = $scope.selectedRow.PIB_Partner;
   				$scope.editPartnerAddress = $scope.selectedRow.Adresa_Partner;
   				$scope.editPartnerPlace = $scope.selectedRow.Mesto.Id;
   				$scope.editPartnerCompany = $scope.selectedRow.Preduzece.Id_Preduzece;

		  });
   		};

    	function fillData(){

			partneriService.get_all_partners()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			preduzecaService.get_all_companies()
				.then(function(response){
				$scope.allCompanies = response;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		};

		fillData();

		$scope.add_partner = function()
		{
			partneriService.create_partner($scope.partnerId, $scope.partnerName, $scope.partnerMBR, $scope.partnerPIB, $scope.partnerAddress, $scope.checkPlace, $scope.checkCompany, $scope.checkType).then(function(response){
				fillData();
			});
		};

		$scope.remove_selected_partner = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			partneriService.remove_partner($scope.selectedRow[0].Id_Partner).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_partner = function(id, name, mbr, pib, address, place, company, type)
		{
			
			partneriService.update_partner(id, name, mbr, pib, address, place, company, type).then(function(response){
				fillData();
			});
		};

	}
];
},{}],17:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function partneriService($http, $window, $q){

		function get_all_partners()
		{
			var resUrl = "http://localhost:61769/api/poslovni_partner";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_partner(id, name, mbr, pib, address, place, company, type)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/poslovni_partner",
                    data: {
                    	Id_Partner: id,
						Id_Preduzece: company, 
						Id: place,
						Tip_Partner: type,
						Naziv_Partner: name,
						Maticni_broj_Partner: mbr,
						PIB_Partner: pib,
						Adresa_Partner: address
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_partner(partnerId)
		{
			var urlDelete = "http://localhost:61769/api/poslovni_partner/"+partnerId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_partner(id, name, mbr, pib, address, place, company, type)
		{
			var url = "http://localhost:61769/api/poslovni_partner/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Partner: id,
						Id_Preduzece: company, 
						Id: place,
						Tip_Partner: type,
						Naziv_Partner: name,
						Maticni_broj_Partner: mbr,
						PIB_Partner: pib,
						Adresa_Partner: address
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_partners: get_all_partners,
			create_partner: create_partner,
			remove_partner: remove_partner,
			update_partner: update_partner, 
		};

	}
];
},{}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
				fillData();
			});
		};

	
		$scope.remove_selected_company = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("ID preduzeca je "+$scope.selectedRow[0].Id_Preduzece);
			preduzecaService.remove_company($scope.selectedRow[0].Id_Preduzece).then(function(response){
				fillData();
			});
		};


		$scope.edit_selected_company = function(id, name, mbr, pib, address, place)
		{
			console.log("Promenjeno: "+id+", "+name+", "+mbr+", "+pib+", "+address+", "+place);
			preduzecaService.update_company(id, name, mbr, pib, address, place).then(function(response){
				fillData();
			});
		};

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
 			//Koji je magacin za sta? xD
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Magacin1.Naziv_Magacin', width:'20%', displayName: 'Odeljenje'},
		    { name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Magacin'},
		    { name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner'},
		    { name:'Redni_broj_Prijemni_dokument', width:'10%', displayName: 'Redni broj'},
		    { name:'Datum_formiranja_Prijemni_dokument', width:'20%', displayName: 'Datum formiranja', cellFilter: 'date:\'dd.MM.yyyy\''},
		    { name:'Ukupna_vrednost_Prijemni_dokument', width:'10%', displayName: 'Ukupna vrednost'}
		  ];

		$http.get("http://localhost:61769/api/prijemni_dokument").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];
},{}],21:[function(require,module,exports){
module.exports = [
	'$scope', '$http', 'robaService', 'merneJediniceService', 'preduzecaService', '$routeParams', '$window',
	function myController($scope, $http, robaService, merneJediniceService, preduzecaService, $routeParams, $window){
		
	//'$scope', '$http', 'robaService', 'grupeRobaService', 'merneJediniceService', 'preduzecaService','$routeParams','$window',
	//function myController($scope, $http, robaService, grupeRobaService, merneJediniceService, preduzecaService, $routeParams, $window) {		
				
		$scope.goodsId = -1;
		$scope.goodsName = "";
		$scope.goodsCategory = "";
		$scope.goodsMeasUnit = "";
		$scope.goodsCompany = "";
		
		$scope.allCategories = {};
		$scope.allMeasUnits = {};
		$scope.allCompanies = {};
		
		$scope.selectedRow = {};
		$scope.selectedGoodsId = -1;
		$scope.selectedGoodsName = "";
		$scope.selectedGoodsCategory = "";
		$scope.selectedGoodsMeasUnit = "";
		$scope.selectedGoodsCompany = "";
		
		$scope.editGoodsName = "";
		$scope.editGoodsCategory = "";
		$scope.editGoodsMeasUnit = "";
		$scope.editGoodsCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv'},
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'20%', displayName: 'Grupa'},
			{ name:'Jedinica_mere.Naziv_Jedinica_mere', width:'15%', displayName:'Jedinica mere'},
		    { name:'Preduzece.Naziv_Preduzece', width:'15%', displayName: 'Preduzece'}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				$scope.selectedGoodsId = $scope.selectedRow.Id_Roba;
				$scope.selectedGoodsName = $scope.selectedRow.Naziv_Roba;
				$scope.selectedGoodsCategory = $scope.selectedRow.Grupa_roba.Id_Grupa_roba;
				$scope.selectedGoodsMeasUnit = $scope.selectedRow.Jedinica_mere.Id_Jedinica_mere;
				$scope.selectedGoodsCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		
				$scope.editGoodsName = $scope.selectedRow.Naziv_Roba;
				$scope.editGoodsCategory = $scope.selectedRow.Grupa_roba.Id_Grupa_roba;
				$scope.editGoodsMeasUnit = $scope.selectedRow.Jedinica_mere.Id_Jedinica_mere;
				$scope.editGoodsCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		 	});
   		};	

		function fillData(){
    		robaService.get_all_goods().then(function(response){
				$scope.gridOptions.data = response;
			});

			// TODO proveriti ime funkcije kad bude napisan servis i 
			// zameniti prve linije fajla
			//grupeRobaService.get_all_categories().then(function(response){
			//	$scope.allCategories = response;
			//});

			merneJediniceService.get_all_measUnits().then(function(response){
				$scope.allMeasUnits = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}

		fillData();

		$scope.add_goods = function()
		{
			robaService.create_goods($scope.goodsId, $scope.goodsName, $scope.goodsCategory, $scope.goodsMeasUnit, $scope.goodsCompany).then(function(response){
				fillData();
			});
		};

		$scope.remove_selected_goods = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			robaService.remove_goods($scope.selectedRow[0].Id).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_goods = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("Promenjeno: "+$scope.selectedGoodsId+", "+$scope.editGoodsName+", "+$scope.editGoodsCategory+", "+$scope.editGoodsMeasUnit+", "+$scope.editGoodsCompany);
			robaService.update_goods($scope.selectedGoodsId, $scope.editGoodsName, $scope.editGoodsCategory, $scope.editGoodsMeasUnit, $scope.editGoodsCompany).then(function(response){
				fillData();
			});
		};
	}
];
},{}],22:[function(require,module,exports){
module.exports = [
	'$http', '$window', '$q',
	function robaService($http, $window, $q) {		
		
		function get_all_goods()
		{
			var resUrl = "http://localhost:61769/api/roba";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_goods(id, naziv, kategorija, mernaJedinica, preduzece)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/roba",
                    data: {
						Id_Roba: id, 
						Naziv_Roba: naziv,
						Id_Grupa_roba: kategorija,
						Id_Jedinica_mere: mernaJedinica,
						Id_Preduzece: preduzece
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_goods(id)
		{
			var urlDelete = "http://localhost:61769/api/roba/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_goods(id, naziv, kategorija, mernaJedinica, preduzece)
		{	
			var url = "http://localhost:61769/api/roba/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
						Id_Roba: id, 
						Naziv_Roba: naziv,
						Id_Grupa_roba: kategorija,
						Id_Jedinica_mere: mernaJedinica,
						Id_Preduzece: preduzece
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_goods: get_all_goods, 
			create_goods: create_goods, 
			update_goods: update_goods, 
			remove_goods: remove_goods,
		};
		
		
	}
];
},{}],23:[function(require,module,exports){
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
},{}],24:[function(require,module,exports){
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
},{}],25:[function(require,module,exports){
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
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Važi od', cellFilter: 'date:\'dd.MM.yyyy\''}
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
    			fillData();
    		});
    	};

    	$scope.remove_PDVRate = function()
    	{
    		stopePDVService.remove_pdvRate($scope.selectedPdvRateId).then(function(response){
    			fillData();
    		});
    	};


    	$scope.edit_PDVRate = function()
    	{
       		var god = $scope.editPdvRateDate.getYear()+1900;
    		var m = $scope.editPdvRateDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editPdvRateDate.getDate();
    		stopePDVService.update_pdvRate($scope.selectedPdvRateId, $scope.editPdvRate, date ,$scope.editPdvRatePdv).then(function(response){
    			fillData();
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
},{}],26:[function(require,module,exports){
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
