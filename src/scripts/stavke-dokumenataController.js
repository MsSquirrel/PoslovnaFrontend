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