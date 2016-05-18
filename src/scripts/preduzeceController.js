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
		    { name:'Id_Preduzece', width:'10%', displayName:'Id'},
		    { name:'Naziv_Preduzece', width:'20%', displayName: 'Naziv'},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Maticni broj'},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'20%', displayName: 'Mesto' },
		    
		  ];

		$http.get("http://localhost:61769/api/preduzece").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];