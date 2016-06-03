module.exports = [
	'$scope', '$http', '$state', '$stateParams', 'robneKarticeService', 
	function myController($scope, $http, $state, $stateParams, robneKarticeService){

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
		    { name:'Magacin.Naziv_Magacin', width:'17%', displayName: 'Magacin', cellTooltip: true, headerTooltip: true},
		    { name:'Poslovna_godina.Godina_Poslovna_godina', width:'8%', displayName: 'Poslovna godina', cellTooltip: true, headerTooltip: true},
		    { name:'Roba.Naziv_Roba', width:'17%', displayName:'Roba', cellTooltip: true, headerTooltip: true},
		    { name:'Prosecna_cena_Robna_kartica', width:'15%', displayName: 'Prosečna cena', cellTooltip: true, headerTooltip: true},
		    { name:'Poc_stanje_kol_Robna_kartica', width:'15%', displayName: 'Poč. stanje količinski', cellTooltip: true, headerTooltip: true},
		    { name:'Poc_stanje_vrednost_Robna_kartica', width:'15%', displayName: 'Poč. stanje vrednosno', cellTooltip: true, headerTooltip: true},
		    { name:'Promet_ulaza_kol_Robna_kartica', width:'15%', displayName: 'Promet ulaza količinski', cellTooltip: true, headerTooltip: true},
		    { name:'Promet_ulaza_vr_Robna_kartica', width:'15%', displayName: 'Promet ulaza vrednosno', cellTooltip: true, headerTooltip: true},
		    //{ name:'Promet_izlaza_kol_Robna_kartica', width:'15%', displayName: 'Promet izlaza količinski', cellTooltip: true, headerTooltip: true},
		    //{ name:'Promet_izlaza_vr_vrednost_Robna_kartica', width:'15%', displayName: 'Promet izlaza vrednosno', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_kolicina_Robna_kartica', width:'15%', displayName: 'Ukupna količina', cellTooltip: true, headerTooltip: true},
		    //{ name:'Roba.Jedinica_mere.Oznaka_Jedinica_mere', width:'10%', displayName: 'Merna jedinica', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Robna_kartica', width:'15%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true }
		  ];

		 $scope.nextMeh = function()
     	 {
	         var url_filter = "?$filter=";

	         var poslovnaGodinaId = $stateParams.poslovnaGodinaId;
	         var magacinId = $stateParams.magacinId;
	         console.log("PARAM: "+ poslovnaGodinaId);

	         if(poslovnaGodinaId=='' && magacinId=='')
	         {
	            return;
	         }

	         if(poslovnaGodinaId!='' && poslovnaGodinaId!=undefined)
	         {
	             url_filter += "Id_Poslovna_godina eq " + poslovnaGodinaId;   
	         }
	      
	      	 if(magacinId!='' && magacinId!=undefined)
	         {
	             url_filter += "Id_Magacin eq " + magacinId;   
	         }

	       	robneKarticeService.get_filtered_robnaKartica(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	         });

      	};

		  function fillData()
		  {
		  	if(($stateParams.poslovnaGodinaId=='' || $stateParams.poslovnaGodinaId==undefined) && ($stateParams.magacinIdId=='' || $stateParams.magacinId==undefined)){
			  	$http.get("http://localhost:61769/api/robna_kartica").then(function(response) {
	        		$scope.gridOptions.data = response.data;
	    		});
		  	}
		  	else
		  	{
		  		$scope.nextMeh();
		  	}
		  }

		  fillData();

	}
];