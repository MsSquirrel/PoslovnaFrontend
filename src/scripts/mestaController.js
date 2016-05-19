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
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv'},
		    { name:'Postansk__broj_Mesto', width:'50%', displayName: 'Poštanski broj'}, 
		  ];

		$http.get("http://localhost:61769/api/mesto").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];