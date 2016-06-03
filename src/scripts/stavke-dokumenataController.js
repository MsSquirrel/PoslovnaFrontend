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

				//JOS 
		 	});
   		};


   		$scope.nextMeh = function()
      	{
	         var url_filter = "?$filter=";

	         var robaId = $stateParams.robaId;
	       
	         console.log("PARAM: "+ robaId);

	         if(robaId=='')
	         {
	            return;
	         }

	         if(robaId!=''  && robaId!=undefined)
	         {
	            url_filter += "Id_Roba eq " + robaId;
	         }

	         console.log(url_filter);
	         stavkeDokumenataService.get_filtered_documentItems(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	         });
      	};


   		function fillData()
    	{
    		if($stateParams.robaId=='' || $stateParams.robaId==undefined){
	    		stavkeDokumenataService.get_all_documentItems()
					.then(function(response){
					$scope.gridOptions.data = response;
				});
			}
			else
			{
				$scope.nextMeh();
			}

			prijemniDokumentiService.get_unrecorded_warehouseReceipts()
				.then(function(response){
				$scope.allWrs = response;
			});
			robaService.get_all_goods()
				.then(function(response){
				$scope.allItems = response;
			});
    	};

    	fillData();

    	$scope.clear_add = function(){
	        $scope.primka = "";
	        $scope.roba = "";
	        $scope.kolicina = "";
	        $scope.nabCena = "";
	        $scope.nabVrednost = "";
	        $scope.marza = "";
	        

	        //$scope.changeCompany = "";
	        
	      }

	  $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      };

      $scope.add_documentItem = function()
    	{
    		alert($scope.primka)
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
    		
    		
    		poslovneGodineService.update_businessYear($scope.warehouseReceiptBusinessYear, $scope.warehouseReceiptWarehouse1, $scope.warehouseReceiptWarehouse2, 
    			$scope.warehouseReceiptPartner, $scope.warehouseReceiptExpenses, $scope.warehouseReceiptTransportExpenses, date).then(function(response){
			   	
		  	});
    	};*/

	}
];