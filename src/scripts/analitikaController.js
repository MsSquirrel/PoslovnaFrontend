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
		    { name:'Redni_broj_Analitika_magacinske_kartice', width:'7%', displayName: 'Rbr.', cellTooltip: true, headerTooltip: true},
		    { name:'Vrsta_prometa_Analitika_magacinske_kartice', width:'7%', displayName: 'Vrsta prometa', cellTooltip: true, headerTooltip: true},
		    { name:'Smer_Analitika_magacinske_kartice', width:'5%', displayName: 'Smer', cellTooltip: true, headerTooltip: true},
		    { name:'Kolicina_Analitika_magacinske_kartice', width:'20%', displayName: 'Količina', cellTooltip: true, headerTooltip: true},
		    { name:'Cena_Analitika_magacinske_kartice', width:'20%', displayName: 'Jedinična cena', cellTooltip: true, headerTooltip: true},
		    { name:'Vrednost_Analitika_magacinske_kartice', width:'20%', displayName: 'Vrednost', cellTooltip: true, headerTooltip: true},
		   	{ name:'Ukupno_stanje_Analitika_magacinske_kartice', width:'20%', displayName: 'Stanje', cellTooltip: true, headerTooltip: true}
		  ];

		$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];