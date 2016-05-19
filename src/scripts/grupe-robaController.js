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
		    { name:'Id_Grupa_roba', width:'15%', displayName:'Id'},
		    { name:'Id_PDV', width:'15%', displayName: 'Po PDV'},
		    { name:'Naziv_Grupa_roba', width:'35%', displayName:'Naziv'}
		];

		$http.get("http://localhost:61769/api/grupa_roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];