module.exports = [
	'$scope', '$http','prijemniDokumentiService' , 'poslovneGodineService', 'magaciniService','partneriService' , '$routeParams','$window', '$state',
	function myController($scope, $http, prijemniDokumentiService,poslovneGodineService, magaciniService,partneriService , $routeParams, $window, $state){
		
		$scope.allYears = {};
		$scope.allWarehouses = {};
		$scope.allPartners = {};

		$scope.selectedWarehouseReceiptId = -1;
		$scope.selectedWarehouseReceiptYear = "";
		$scope.selectedWarehouseReceiptPartner = "";
		$scope.selectedWarehouseReceiptWarehouse1 = "";
		$scope.selectedWarehouseReceiptWarehouse2 = "";
		$scope.selectedWarehouseReceiptExpenses = 0;
		$scope.selectedWarehouseReceiptTransportExpenses = 0;

		$scope.editWarehouseReceiptYear = "";
		$scope.editWarehouseReceiptPartner = "";
		$scope.editWarehouseReceiptWarehouse1 = "";
		$scope.editWarehouseReceiptWarehouse2 = "";
		$scope.editWarehouseReceiptExpenses = 0;
		$scope.editWarehouseReceiptTransportExpenses = 0;

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Redni_broj_Prijemni_dokument', width:'7%', displayName: 'Redni broj', cellTooltip: true, headerTooltip: true},
 		 	{ name:'Poslovna_godina.Godina_Poslovna_godina', width:'10%', displayName: 'Poslovna godina', cellTooltip: true, headerTooltip: true},
 		 	{ name:'Magacin1.Naziv_Magacin', width:'20%', displayName: 'U koji magacin', cellTooltip: true, headerTooltip: true},
 		 	{ name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Iz kog magacina', cellTooltip: true, headerTooltip: true},
		    { name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner', cellTooltip: true, headerTooltip: true},
		    { name:'Status_Prijemni_dokument', width:'7%', displayName: 'Status', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_formiranja_Prijemni_dokument', width:'13%', displayName: 'Datum formiranja', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_knjizenja_Prijemni_dokument', width:'13%', displayName: 'Datum knjiženja', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_nabavna_vrednost_Prijemni_dokument', width:'12%', displayName: 'Ukupna nabavna vrednost', cellTooltip: true, headerTooltip: true},
		    { name:'Zavisni_troskovi_Prijemni_dokument', width:'12%', displayName: 'Zavisni troškovi', cellTooltip: true, headerTooltip: true},
		    { name:'Transportni_troskovi_Prijemni_dokument', width:'12%', displayName: 'Transportni troškovi', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Prijemni_dokument', width:'12%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true}
		  ];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
		          if ($scope.selectedRow != null)
		            $(".edit-btn, .remove-btn").attr("disabled", false);
		          else
		            $(".edit-btn, .remove-btn").attr("disabled", true);

   				$scope.selectedWarehouseReceiptId = $scope.selectedRow.Id_Prijemni_dokument;
   				$scope.selectedWarehouseReceiptYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
   				$scope.selectedWarehouseReceiptExpenses = $scope.selectedRow.Zavisni_troskovi_Prijemni_dokument;
   				$scope.selectedWarehouseReceiptWarehouse2 = $scope.selectedRow.Magacin1.Id_Magacin;
   				$scope.selectedWarehouseReceiptWarehouse1 = $scope.selectedRow.Magacin.Id_Magacin;
   				$scope.selectedWarehouseReceiptPartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
   				$scope.selectedWarehouseReceiptTransportExpenses = $scope.selectedRow.Transportni_troskovi_Prijemni_dokument;

   				$scope.editWarehouseReceiptYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
   				$scope.editWarehouseReceiptExpenses = $scope.selectedRow.Zavisni_troskovi_Prijemni_dokument;
   				$scope.editWarehouseReceiptWarehouse2 = $scope.selectedRow.Magacin1.Id_Magacin;
   				$scope.editWarehouseReceiptWarehouse1 = $scope.selectedRow.Magacin.Id_Magacin;
   				$scope.editWarehouseReceiptPartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
   				$scope.editWarehouseReceiptTransportExpenses = $scope.selectedRow.Transportni_troskovi_Prijemni_dokument;

		 	});
   		};

   		function fillData()
    	{
    		prijemniDokumentiService.get_all_warehouseReceipts()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
			poslovneGodineService.get_all_businessYears()
				.then(function(response){
				$scope.allYears = response;
			});
			magaciniService.get_all_warehouses()
				.then(function(response){
				$scope.allWhs = response;
			});
			partneriService.get_all_partners()
				.then(function(response){
				$scope.allPartners = response;
			});
    	};

    	fillData();

    	$scope.clear_add = function(){
	        $scope.warehouseReceiptBusinessYear = 0;
	        $scope.wareHouseReceiptPartner = "";
	        $scope.warehouseReceiptWarehouse1 = "";
	        $scope.warehouseReceiptWarehouse2 = "";
	        $scope.warehouseReceiptTransportExpenses = 0;
	        $scope.warehouseReceiptExpenses = 0;

	        //$scope.changeCompany = "";
	        
	      }

      $scope.clear_add();

      $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      };

      $scope.add_warehouseReceipt = function()
    	{
    		prijemniDokumentiService.create_warehouseReceipt($scope.warehouseReceiptBusinessYear, $scope.warehouseReceiptWarehouse1, $scope.warehouseReceiptWarehouse2, 
    			$scope.warehouseReceiptPartner, $scope.warehouseReceiptExpenses, $scope.warehouseReceiptTransportExpenses).then(function(response){
	          	$scope.clear_add(); 
	          	$state.go('^',{}, {reload:true});
		  	});
    	};

    	$scope.remove_selected_warehouseReceipt = function()
    	{
    		prijemniDokumentiService.remove_warehouseReceipt($scope.selectedWarehouseReceiptId).then(function(response){
				fillData();
        
			});
    	};


    	/*$scope.edit_selected_warehouseReceipt = function()
    	{
    		
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
			   	
		  	});
    	};*/


		$http.get("http://localhost:61769/api/prijemni_dokument").then(function(response) {
        	$scope.gridOptions.data = response.data;
    	});

	}
];