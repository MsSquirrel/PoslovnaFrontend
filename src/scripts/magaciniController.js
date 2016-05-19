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
		    { name:'Naziv_Magacin', width:'35%', displayName:'Naziv magacina'},
		    { name:'Mesto.Naziv_Mesto', width:'30%', displayName: 'Mesto'},
		    { name:'Adresa_Magacin', width:'35%', displayName:'Adresa'}
		];

		$http.get("http://localhost:61769/api/magacin").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];