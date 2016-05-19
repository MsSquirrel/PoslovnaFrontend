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
		    { name:'Id_Jedinica_mere', width:'30%', displayName:'Id'},
		    { name:'Naziv_Jedinica_mere', width:'70%', displayName:'Naziv'}
		];

		$http.get("http://localhost:61769/api/jedinica_mere").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];