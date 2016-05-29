module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		if (!$scope.currentUser && window.location != "#/login"){
			window.location = "#/login";
		}

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			//Koji je magacin za sta? xD
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Magacin1.Naziv_Magacin', width:'20%', displayName: 'Odeljenje', cellTooltip: true, headerTooltip: true},
		    { name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Magacin', cellTooltip: true, headerTooltip: true},
		    { name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner', cellTooltip: true, headerTooltip: true},
		    { name:'Redni_broj_Prijemni_dokument', width:'10%', displayName: 'Redni broj', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_formiranja_Prijemni_dokument', width:'20%', displayName: 'Datum formiranja', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Prijemni_dokument', width:'10%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true}
		  ];

		$http.get("http://localhost:61769/api/prijemni_dokument").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];