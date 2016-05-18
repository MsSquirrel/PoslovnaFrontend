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
		    { name:'Id_Partner', width:'5%', displayName:'Id'},
		    { name:'Naziv_Partner', width:'15%', displayName: 'Partner'},
		    { name:'Tip_Partner', width:'15%', displayName: 'Tip partnera'},
		    { name:'Maticni_broj_Partner', width:'15%', displayName: 'Matični broj'},
		    { name:'PIB_Partner', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Partner', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto' },
		    
		  ];

		$http.get("http://localhost:61769/api/poslovni_partner").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];