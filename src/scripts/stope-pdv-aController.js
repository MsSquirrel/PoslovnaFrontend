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
			{ name:'PDV.Naziv_PDV', width:'30%', displayName: 'Za PDV'},
		    { name:'Stopa_Stopa_PDV_a', width:'35%', displayName: 'Stopa'},
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Vazi od'}
		];

		$http.get("http://localhost:61769/api/stopa_pdva").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];