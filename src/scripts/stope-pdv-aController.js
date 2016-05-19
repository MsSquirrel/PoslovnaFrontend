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
		    { name:'Id_Stopa_PDV_a', width:'25%', displayName:'Id'},
		    { name:'Stopa_Stopa_PDV_a', width:'35%', displayName: 'Stopa'},
		    { name:'Id_PDV', width:'40%', displayName: 'Za PDV'}
		];

		$http.get("http://localhost:61769/api/stopa_pdva").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];