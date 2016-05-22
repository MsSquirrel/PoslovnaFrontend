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