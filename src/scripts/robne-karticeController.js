module.exports = [
	'$scope', '$http', '$state', '$stateParams', 'robneKarticeService', 'robaService', 'poslovneGodineService', 'magaciniService',
	function myController($scope, $http, $state, $stateParams, robneKarticeService, robaService, poslovneGodineService, magaciniService){

		$scope.selectedWareCardId = -1;

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


		 $scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedWareCardId = $scope.selectedRow.Id_Robna_kartica;
   			});
   		};

		 $scope.nextMeh = function()
     	 {
	         var url_filter = "?$filter=";

	         var poslovnaGodinaId = $stateParams.poslovnaGodinaId;
	         var magacinId = $stateParams.magacinId;
	         var robaId = $stateParams.robaId;

	         console.log("PARAM: "+ poslovnaGodinaId);

	         if(poslovnaGodinaId=='' && magacinId=='' && robaId=='')
	         {
	            return;
	         }

	         var first = true;

	         if(poslovnaGodinaId!='' && poslovnaGodinaId!=undefined)
	         {
	             url_filter += "Id_Poslovna_godina eq " + poslovnaGodinaId; 
	             first = false;  
	         }
	      
	      	 if(magacinId!='' && magacinId!=undefined)
	         {	
	         	if(!first){
	         		url_filter += " and ";
	         	}else
	         		first = false;

	             url_filter += "Id_Magacin eq " + magacinId;   
	         	
	         }

	          if(robaId!='' && robaId!=undefined)
	         {	

	         	if(!first){
	         		url_filter += " and ";
	         	}else
	         		first = false;

	             url_filter += "Id_Roba eq " + robaId;   
	         }

	       	robneKarticeService.get_filtered_robnaKartica(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	         });

      	};


      	$scope.search = {};
      	$scope.search.poslovna_godina = '';
      	$scope.search.magacin = '';
      	$scope.search.roba = '';

      	$scope.search.iPAS = function(){

   			if($scope.search.poslovna_godina != '' || $scope.search.magacin != '' || $scope.search.roba != '' )
   				$state.go('robne-kartice', {poslovnaGodinaId: $scope.search.poslovna_godina, magacinId: $scope.search.magacin, robaId: $scope.search.roba});
   		}

   		$scope.refresh = function(){
   			$state.go('robne-kartice', {poslovnaGodinaId: undefined, magacinId: undefined, robaId: undefined});
   		}

   		$scope.izvestaj = function(){

        $http.get('http://localhost:61769/api/pdf/kartica/' + $scope.selectedWareCardId, {responseType: 'arraybuffer'})
         .success(function (data) {
             var file = new Blob([data], {type: 'application/pdf'});
             var fileURL = URL.createObjectURL(file);
             window.open(fileURL);
        });

     	}

		function fillData()
		{
		  	if(($stateParams.poslovnaGodinaId=='' || $stateParams.poslovnaGodinaId==undefined) && ($stateParams.magacinIdId=='' || $stateParams.magacinId==undefined) && ($stateParams.robaId=='' || $stateParams.robaId==undefined)){
			  	$http.get("http://localhost:61769/api/robna_kartica").then(function(response) {
	        		$scope.gridOptions.data = response.data;
	    		});
		  	}
		  	else
		  	{
		  		$scope.nextMeh();
		  	}


		  	poslovneGodineService.get_active_businessYears()
  				.then(function(response){
  				$scope.allYears = response;
  			});
  			magaciniService.get_all_warehouses()
  				.then(function(response){
  				$scope.allWhs = response;
  			});

  			robaService.get_all_goods()
				.then(function(response){
				$scope.allItems = response;
			});
		}

		fillData();

	}
];