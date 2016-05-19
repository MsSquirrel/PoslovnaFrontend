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
		    { name:'Naziv_Grupa_roba', width:'75%', displayName:'Naziv'},
		    { name:'PDV.Naziv_PDV', width:'25%', displayName: 'Po PDV'}
		];

		$http.get("http://localhost:61769/api/grupa_roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];