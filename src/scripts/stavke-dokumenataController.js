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
 		 	{ name:'Prijemni_dokument.Magacin1.Naziv_Magacin', width:'20%', displayName: 'Odeljenje', cellTooltip: true, headerTooltip: true},
		    { name:'Prijemni_dokument.Redni_broj_Prijemni_dokument', width:'20%', displayName: 'Rbr prijemnog dok.', cellTooltip: true, headerTooltip: true},
		    { name:'Roba.Naziv_Roba', width:'20%', displayName: 'Naziv robe', cellTooltip: true, headerTooltip: true},
		    { name:'Kolicina_Stavka_dokumenta', width:'10%', displayName: 'Količina', cellTooltip: true, headerTooltip: true},
		    { name:'Roba.Jedinica_mere.Naziv_Jedinica_mere', width:'20%', displayName: 'Mera', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Stavka_dokumenta', width:'10%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true}
		  ];

		$http.get("http://localhost:61769/api/stavka_dokumenta").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];