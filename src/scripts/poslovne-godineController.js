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
		    { name:'Id_Poslovna_godina', width:'15%', displayName:'Id'},
		    { name:'Godina_Poslovna_godina', width:'25%', displayName: 'Poslovna godina'},
		    { name:'Zakljucena_Poslovna_godina', width:'15%', displayName: 'Zaključena'},
		    { name:'Preduzece.Naziv_Preduzece', width:'45%', displayName: 'Preduzeće'},
		  ];

		$http.get("http://localhost:61769/api/poslovna_godina").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];