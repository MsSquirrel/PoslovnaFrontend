module.exports = [
	'$scope', '$http', 'stavkeDokumenataService', 'prijemniDokumentiService', 'robaService', '$state', '$stateParams',
	function myController($scope, $http, stavkeDokumenataService, prijemniDokumentiService, robaService, $state, $stateParams){

		$scope.allWrs = {};
		$scope.allItems = {};

		$scope.selectedDocumentItemId = -1;
		$scope.selectedDocumentItemWr = "";
		$scope.selectedDocumentItemItem = "";
		// JOS

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 		
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Prijemni_dokument.Magacin1.Naziv_Magacin', width:'20%', displayName: 'Magacin', cellTooltip: true, headerTooltip: true},
		    { name:'Prijemni_dokument.Redni_broj_Prijemni_dokument', width:'7%', displayName: 'Primka (rbr).', cellTooltip: true, headerTooltip: true},
		    { name:'Roba.Naziv_Roba', width:'20%', displayName: 'Naziv robe', cellTooltip: true, headerTooltip: true},
		    { name:'Kolicina_Stavka_dokumenta', width:'10%', displayName: 'Količina', cellTooltip: true, headerTooltip: true},
		    { name:'Roba.Jedinica_mere.Oznaka_Jedinica_mere', width:'8%', displayName: 'Mera', cellTooltip: true, headerTooltip: true},
		    { name:'Nabavna_cena_Stavka_dokumenta', width:'12%', displayName: 'Nab. cena', cellTooltip: true, headerTooltip: true},
		    { name:'Nabavna_vrednost_Stavka_dokumenta', width:'12%', displayName: 'Nab. vrednost', cellTooltip: true, headerTooltip: true},
		    { name:'Transportni_trosak_Stavka_dokumenta', width:'12%', displayName: 'Transp. trošak', cellTooltip: true, headerTooltip: true},
		    { name:'Zavisni_trosak_Stavka_dokumenta', width:'12%', displayName: 'Zav. trošak', cellTooltip: true, headerTooltip: true},
		    { name:'Kalkulisana_cena_Stavka_dokumenta', width:'12%', displayName: 'Kalk. cena', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Stavka_dokumenta', width:'12%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true}
		  ];

		
		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
		          
   				$scope.selectedDocumentItemId = $scope.selectedRow.Id_Stavka_dokumenta;
				$scope.selectedDocumentItemWr = $scope.selectedRow.Prijemni_dokument.Id_Prijemni_dokument;
				$scope.selectedDocumentItemItem = $scope.selectedRow.Roba.Id_Roba;

				$scope.editPrimka = $scope.selectedRow.Prijemni_dokument.Id_Prijemni_dokument;
				$scope.editRoba = $scope.selectedRow.Roba.Id_Roba;
				$scope.editKolicina = $scope.selectedRow.Kolicina_Stavka_dokumenta;
				$scope.editNabCena = $scope.selectedRow.Nabavna_vrednost_Stavka_dokumenta;
				$scope.editMarza = $scope.selectedRow.Procenat_marze_Stavka_dokumenta;
		 	});
   		};

      	$scope.search = {};
      	$scope.search.prijemni_dokument = '';
      	$scope.search.roba = '';

      	$scope.search.iPAS = function(){

   			if($scope.search.naziv != '' || $scope.search.postanski_broj != '' )
   				$state.go('stavke-dokumenata', {robaId: $scope.search.roba, prijemniDokumentId: $scope.search.prijemni_dokument});
   		}


   		var filterData = function(roba, pd){

   			if(roba==='' && pd==='')
   				return;

   			var url_filter = "?$filter="

   			var prvi= true;
   			
   			if(roba!=''){
   				prvi =	false;
   				url_filter += "Id_Roba eq " + roba;
   			}

   			if(pd!=''){
   				if(!prvi){
   					url_filter += " and "
   				}

   				url_filter += "Id_Prijemni_dokument eq " + pd;
   			}

   			stavkeDokumenataService.get_filtered_documentItems(url_filter).then(function(response){
               	$scope.gridOptions.data = response;
         		
         		$scope.search.prijemni_dokument = '';
  				$scope.search.roba = '';
	         });

   		}


   		$scope.refresh = function(){
			$state.go('stavke-dokumenata', {robaId: undefined, prijemniDokumentId: undefined});
		};


		if(($stateParams.robaId == undefined && $stateParams.prijemniDokumentId == undefined) || ($stateParams.robaId == '' && $stateParams.prijemniDokumentId == ''))
			fillData();
		else{
			
			var par_roba = '';
			var par_pd = '';
			
			if($stateParams.robaId != undefined)
				par_roba = $stateParams.robaId;

			if($stateParams.prijemniDokumentId != undefined)
				par_pd = $stateParams.prijemniDokumentId;


			filterData(par_roba, par_pd);

			prijemniDokumentiService.get_unrecorded_warehouseReceipts()
				.then(function(response){
				$scope.allWrs = response;
			});


			prijemniDokumentiService.get_all_warehouseReceipts()
				.then(function(response){
				$scope.allAllWrs = response;
			});
				
			robaService.get_all_goods()
				.then(function(response){
				$scope.allItems = response;
			});

		}

   		function fillData()
    	{
    		stavkeDokumenataService.get_all_documentItems().then(function(response){
					$scope.gridOptions.data = response;
			});

			prijemniDokumentiService.get_unrecorded_warehouseReceipts()
				.then(function(response){
				$scope.allWrs = response;
			});

			prijemniDokumentiService.get_all_warehouseReceipts()
				.then(function(response){
				$scope.allAllWrs = response;
			});

			robaService.get_all_goods()
				.then(function(response){
				$scope.allItems = response;
			});
    	};

    	$scope.clear_add = function(){
	        $scope.primka = "";
	        $scope.roba = "";
	        $scope.kolicina = "";
	        $scope.nabCena = "";
	        $scope.nabVrednost = "";
	        $scope.marza = "";
			if($scope.isModal)
			{
				$scope.$close(true);
			}
	        

	        //$scope.changeCompany = "";
	        
	      }

	  $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      };

      $scope.add_documentItem = function()
    	{
    		
    		stavkeDokumenataService.create_documentItem($scope.primka, $scope.roba, $scope.kolicina, $scope.nabCena, $scope.marza).then(function(response){
	          	$scope.clear_add(); 
	          	$state.go('^',{}, {reload:true});
		  	});
    	};

    	$scope.remove_selected_documentItem = function()
    	{
    		stavkeDokumenataService.remove_documentItem($scope.selectedDocumentItemId).then(function(response){
				fillData();
        
			});
    	};


    	/*$scope.edit_documentItem = function()
    	{	
    		poslovneGodineService.update_businessYear($scope.editPrimka, $scope.editRoba, $scope.editKolicina, $scope.editNabCena, $scope.editMarza).then(function(response){
			   	$state.go('^',{}, {reload:true});
		  	});
    	};*/
	}
];