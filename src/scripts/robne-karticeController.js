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