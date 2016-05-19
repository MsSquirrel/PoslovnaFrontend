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
		    { name:'Naziv_Jedinica_mere', width:'100%', displayName:'Naziv'}
		];

		$http.get("http://localhost:61769/api/jedinica_mere").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];