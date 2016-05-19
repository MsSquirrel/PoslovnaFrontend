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
		    { name:'Id_Roba', width:'15%', displayName:'Id'},
		    { name:'Id_Grupa_roba', width:'20%', displayName: 'Pripada grupi'},
		    { name:'Id_Jedinica_mere', width:'15%', displayName:'Jedinica mere'},
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv'}
		];

		$http.get("http://localhost:61769/api/roba").then(function(response) {

        	$scope.gridOptions.data = response.data;
    	});

	}
];