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
 		 	{ name:'Robna_kartica.Magacin.Naziv_Magacin', width:'30%', displayName: 'Magacin', cellTooltip: true, headerTooltip: true},
		    { name:'Redni_broj_Analitika_magacinske_kartice', width:'10%', displayName: 'Rbr.', cellTooltip: true, headerTooltip: true},
		    { name:'Smer_Analitika_magacinske_kartice', width:'15%', displayName: 'Smer', cellTooltip: true, headerTooltip: true},
		    { name:'Kolicina_Analitika_magacinske_kartice', width:'20%', displayName: 'Ukupna količina', cellTooltip: true, headerTooltip: true},
		    { name:'Cena_Analitika_magacinske_kartice', width:'25%', displayName: 'Cena', cellTooltip: true, headerTooltip: true}
		  ];

		$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];