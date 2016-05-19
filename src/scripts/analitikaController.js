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