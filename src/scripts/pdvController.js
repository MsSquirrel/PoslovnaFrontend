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
		    { name:'Naziv_PDV', width:'75%', displayName: 'Naziv'}
		];

		$http.get("http://localhost:61769/api/PDV").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];