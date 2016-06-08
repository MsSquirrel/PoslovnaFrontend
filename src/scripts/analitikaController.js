module.exports = [
	'$scope', '$http', '$state', '$stateParams', 'analitikaService', 
	function myController($scope, $http, $state, $stateParams, analitikaService){

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
		    { name:'Redni_broj_Analitika_magacinske_kartice', width:'7%', displayName: 'Rbr.', cellTooltip: true, headerTooltip: true},
		    { name:'Vrsta_prometa_Analitika_magacinske_kartice', width:'7%', displayName: 'Vrsta prometa', cellTooltip: true, headerTooltip: true},
		    { name:'Smer_Analitika_magacinske_kartice', width:'5%', displayName: 'Smer', cellTooltip: true, headerTooltip: true},
		    { name:'Kolicina_Analitika_magacinske_kartice', width:'20%', displayName: 'Količina', cellTooltip: true, headerTooltip: true},
		    { name:'Cena_Analitika_magacinske_kartice', width:'20%', displayName: 'Jedinična cena', cellTooltip: true, headerTooltip: true},
		    { name:'Vrednost_Analitika_magacinske_kartice', width:'20%', displayName: 'Vrednost', cellTooltip: true, headerTooltip: true},
		   	{ name:'Ukupno_stanje_Analitika_magacinske_kartice', width:'21%', displayName: 'Stanje', cellTooltip: true, headerTooltip: true}
		  ];



		  $scope.nextMeh = function()
     	 {
	         var url_filter = "?$filter=";

	         var robnaKarticaId = $stateParams.robnaKarticaId;
	         
	       

	         if(robnaKarticaId=='')
	         {
	            return;
	         }

	         if(robnaKarticaId!='' && robnaKarticaId!=undefined)
	         {
	             url_filter += "Id_Robna_kartica eq " + robnaKarticaId;   
	         }

	       	 analitikaService.get_filtered_analitika(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	               $scope.roba = response[0].Robna_kartica.Roba.Naziv_Roba;
	               $scope.mj = response[0].Robna_kartica.Roba.Jedinica_mere.Oznaka_Jedinica_mere;
	               $scope.godina = response[0].Robna_kartica.Poslovna_godina.Godina_Poslovna_godina;
	               $scope.magacin = response[0].Robna_kartica.Magacin.Naziv_Magacin;
	         });

      	};

      	function fillData(){
      		if($stateParams.robnaKarticaId=='' || $stateParams.robnaKarticaId==undefined){
      			
				$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
		        	$scope.gridOptions.data = response.data;
		        	
		    	});
			}
			else
			{
				
				$scope.nextMeh();
			}
		};	

		fillData();

	}
];