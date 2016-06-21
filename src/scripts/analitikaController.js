module.exports = [
	'$scope', '$http', '$state', '$stateParams', 'analitikaService', 'magaciniService', 'robaService', 'robneKarticeService',
	function myController($scope, $http, $state, $stateParams, analitikaService, magaciniService, robaService, robneKarticeService){

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
	         var magacinId = $stateParams.magacinId;
	         var robaId = $stateParams.robaId;
	       	 $scope.vrednostD = $stateParams.vrednostD;
	       	 $scope.vrednostG = $stateParams.vrednostG;

	         if(robnaKarticaId!='' && robnaKarticaId!=undefined)
	         {
	             url_filter += "Id_Robna_kartica eq " + robnaKarticaId;   
	         

		       	 analitikaService.get_filtered_analitika(url_filter).then(function(response){
		               $scope.gridOptions.data = response;
		               $scope.roba = response[0].Robna_kartica.Roba.Naziv_Roba;
		               $scope.mj = response[0].Robna_kartica.Roba.Jedinica_mere.Oznaka_Jedinica_mere;
		               $scope.godina = response[0].Robna_kartica.Poslovna_godina.Godina_Poslovna_godina;
		               $scope.magacin = response[0].Robna_kartica.Magacin.Naziv_Magacin;
		         });

	       	}else{

	       		if((magacinId!='' && magacinId!=undefined) || (robaId!='' && robaId!=undefined)){

		       		var first = true;

		       		if(magacinId!='' && magacinId!=undefined){

		       			url_filter += "Id_Magacin eq " + magacinId;
		       			first = false;
		       		}

		       		if(robaId!='' && robaId!=undefined){
		       			if(first){
		       				url_filter += "Id_Roba eq " + robaId;
		       			}else{
		       				url_filter += " and Id_Roba eq " + robaId;
		       			}
		       		 }

		       		robneKarticeService.get_filtered_robnaKartica(url_filter).then(function(response){
		               
		               if(response.length > 0){

			               var url_filter = "?$filter=";	

			               	var loopFirst = true;
			               	for (var x in response) {
		    					if(loopFirst){

		    						url_filter += "Id_Robna_kartica eq " + response[x].Id_Robna_kartica;
		    						loopFirst = false;
		    					}else{
		    						url_filter += " or Id_Robna_kartica eq " + response[x].Id_Robna_kartica;	
		    					}


							}

							var vrednostG = $scope.vrednostG;
							var vrednostD = $scope.vrednostD;
							vrednostG = vrednostG + 1;


							analitikaService.get_filtered_analitika(url_filter).then(function(response){
				               
				               	var vrednostG = $scope.vrednostG;
								var vrednostD = $scope.vrednostD;
				              
					            if(vrednostD != undefined || vrednostG != undefined){
					              	var retVal = new Array();
					              	

					              	if(vrednostD != undefined && vrednostG != undefined){
					              		for(var x in response){

						              		if(response[x].Vrednost_Analitika_magacinske_kartice>vrednostD && response[x].Vrednost_Analitika_magacinske_kartice<vrednostG)
						              			retVal.push(response[x]);
						              	}
					              	}else{


					              		if(vrednostD != undefined){
					              			for(var x in response){
						              			if(response[x].Vrednost_Analitika_magacinske_kartice>vrednostD)
						              				retVal.push(response[x]);
						              		}
					              		}else{

					              		
					              			for(var x in response){
						              			if(response[x].Vrednost_Analitika_magacinske_kartice<vrednostG)
						              				retVal.push(response[x]);
						              		}
					              		}
					              	}

					              	$scope.gridOptions.data = retVal;
					              	$scope.roba = '';
				               		$scope.mj = '';
				              		$scope.godina = '';
									$scope.magacin = '';

				          		}else{

				          			$scope.gridOptions.data = response;
				          			$scope.roba = '';
				               		$scope.mj = '';
				               		$scope.godina = '';
				               		$scope.magacin = '';
				          		}	

				        	 });

						}else{

							   $scope.gridOptions.data = response;
				               $scope.roba = '';
				               $scope.mj = '';
				               $scope.godina = '';
				               $scope.magacin = '';
						}
		         	});

	       		}else{


	       			var first = true;
	       			var url_filter = "?$filter=";

	       			vrednostD = $scope.vrednostD;
	       			vrednostG = $scope.vrednostG;

	       			if(vrednostD!='' && vrednostD!=undefined){
	       				url_filter += "Vrednost_Analitika_magacinske_kartice gt " + vrednostD;
	       				first = false;
	       			}

	       			if(vrednostG!='' && vrednostG!=undefined){
	       				if(first)
	       					url_filter += "Vrednost_Analitika_magacinske_kartice lt " + vrednostG;
	       				else
	       					url_filter += " and Vrednost_Analitika_magacinske_kartice lt " + vrednostG;
	       			}

	       			analitikaService.get_filtered_analitika(url_filter).then(function(response){
		                $scope.gridOptions.data = response;
		              	$scope.roba = '';
				        $scope.mj = '';
				        $scope.godina = '';
				        $scope.magacin = '';
		        	 });


	       		}

	       	}

      	};

      	function fillData(){
      		if($stateParams.robnaKarticaId==undefined && $stateParams.magacinId==undefined && $stateParams.robaId==undefined && $stateParams.vrednostG==undefined && $stateParams.vrednostD==undefined){
      			
				$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
		        	$scope.gridOptions.data = response.data;
		        	
		    	});
			}
			else
			{
				
				$scope.nextMeh();
			}
		

			robaService.get_all_goods().then(function(response){
					$scope.allGoods = response;
			});	

			magaciniService.get_all_warehouses().then(function(response){
					$scope.allWarehouses = response;
			});

		};	

		fillData();

		
		$scope.search = {};
		$scope.search.magacin= '';
		$scope.search.roba = '';
		$scope.search.vrednostD = '';
	    $scope.search.vrednostG = '';

		$scope.search.iPAS = function(){

			if($scope.search.roba != '' || $scope.search.magacin != '' || $scope.search.vrednostG != '' || $scope.search.vrednostD != '' )
				$state.go('analitika', {magacinId: $scope.search.magacin, robaId: $scope.search.roba, vrednostG: $scope.search.vrednostG, vrednostD: $scope.search.vrednostD });
		}

		$scope.refresh = function(){
   			$state.go('analitika', {magacinId: undefined, robaId: undefined, vrednostG: undefined, vrednostD: undefined });
   		}
	}

	
];