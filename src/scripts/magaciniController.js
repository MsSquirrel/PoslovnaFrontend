module.exports = [
	'$scope', '$http', 'magaciniService', 'mestaService', 'preduzecaService', '$routeParams','$window', '$state', '$stateParams',
	function myController($scope, $http, magaciniService, mestaService, preduzecaService, $routeParams, $window, $state, $stateParams){

		$scope.allPlaces = {};
		$scope.allCompanies = {};

		$scope.selectedRow = {};
   		$scope.selectedWarehouseId = -1;
   	
		$scope.editWarehouseName = "";
		$scope.editWarehouseAddress = "";
		$scope.editWarehousePlace = "";
		$scope.editWarehouseCompany = "";

		$scope.isModal = $state.current.data.isModal;
   		console.log("Warehouse is modal: "+$scope.isModal);

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Magacin', width:'40%', displayName:'Naziv magacina', cellTooltip: true, headerTooltip: true},
		    { name:'Adresa_Magacin', width:'40%', displayName:'Adresa', cellTooltip: true, headerTooltip: true},
		    { name:'Mesto.Naziv_Mesto', width:'20%', displayName: 'Mesto', cellTooltip: true, headerTooltip: true}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];					 

		   		$scope.selectedWarehouseId = $scope.selectedRow.Id_Magacin;
		   		$scope.selectedWarehouseName = $scope.selectedRow.Naziv_Magacin;
		   		$scope.selectedWarehouseAddress = $scope.selectedRow.Adresa_Magacin;
		   		$scope.selectedWarehousePlace = $scope.selectedRow.Mesto.Id;
		   		$scope.selectedWarehouseCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
   	
				$scope.editWarehouseName = $scope.selectedRow.Naziv_Magacin;
				$scope.editWarehouseAddress = $scope.selectedRow.Adresa_Magacin;
				$scope.editWarehousePlace = $scope.selectedRow.Mesto.Id;
				$scope.editWarehouseCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		  });
   		};




   	$scope.search = {};
    $scope.search.naziv = '';
    $scope.search.mesto = '';


    $scope.search.iPAS = function(){

   			if($scope.search.naziv != '' || $scope.search.mesto != '' )
   				$state.go('magacini', {naziv: $scope.search.naziv, mestoId: $scope.search.mesto});
   		}


    var filterData = function(naziv, mesto){

        var naziv = naziv.trim();
        var mesto = mesto.trim();
        

        if(mesto==='' && naziv==='')
   				return;

		var url_filter = "?$filter="

        
        var prvi= true;
   			
		if(naziv!=''){
			prvi =	false;
			url_filter += "substringof('" + naziv + "', Naziv_Magacin) eq true";
		}

		if(mesto!=''){
			if(!prvi){
				url_filter += " and "
			}

			url_filter += "Id eq " + mesto;
		}

		console.log(url_filter);
		magaciniService.get_filtered_warehouses(url_filter).then(function(response){
			$scope.gridOptions.data = response;
			$scope.search.naziv= '';
			$scope.search.mesto = '';
		});

      }

      $scope.nextMeh = function()
      {
         var url_filter = "?$filter=";

         var preduzeceId = $stateParams.preduzeceId;
         var mestoId = $stateParams.mestoId;
         console.log("PARAM: "+ mestoId);

         if(mestoId=='' && preduzeceId=='')
         {
            return;
         }

         if(mestoId!=''  && mestoId!=undefined)
         {
            url_filter += "Id eq " + mestoId;
         }

         if(preduzeceId!='' && preduzeceId!=undefined)
         {
         	 url_filter += "Id_Preduzece eq " + preduzeceId;	
         }

         console.log(url_filter);
         magaciniService.get_filtered_warehouses(url_filter).then(function(response){
               $scope.gridOptions.data = response;
         });
      };



    	function fillData(){
    		if(($stateParams.mestaId=='' || $stateParams.mestoId==undefined) && ($stateParams.preduzeceId=='' || $stateParams.preduzeceId==undefined)){
	    		magaciniService.get_all_warehouses().then(function(response){
					$scope.gridOptions.data = response;
				});
    		}
    		else
    		{
    			$scope.nextMeh();
    		}
			
			mestaService.get_all_places().then(function(response){
				$scope.allPlaces = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		};
		 

		$scope.refresh = function(){
			$state.go('magacini', {naziv: undefined, mestoId: undefined});
		};


		 
		if($stateParams.naziv == undefined && $stateParams.mestoId == undefined)
			fillData();
		else{
			
			var par_naziv = '';
			var par_mesto = '';
			
			if($stateParams.naziv != undefined)
				par_naziv = $stateParams.naziv;

			if($stateParams.mestoId != undefined)
				par_mesto = $stateParams.mestoId;


			filterData(par_naziv, par_mesto);

			mestaService.get_all_places().then(function(response){
				$scope.allPlaces = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});

		}

		$scope.clear_add = function(){
			$scope.warehouseName = "";
			$scope.warehouseAddress = "";
			$scope.warehousePlace = "";
			$scope.warehouseCompany = "";
			if($scope.isModal)
			{
				$scope.$close(true);
			}
		};

		$scope.clear_add();

		$scope.add_warehouse = function()
		{
			magaciniService.create_warehouse($scope.warehouseId, $scope.warehouseName, $scope.warehouseAddress, $scope.warehousePlace, $scope.warehouseCompany).then(function(response){
				$scope.clear_add();
				$state.go('^',{}, {reload:true});
			});
		};
	
		$scope.remove_selected_warehouse = function()
		{
			console.log("ID magacina je "+$scope.selectedWarehouseId);
			magaciniService.remove_warehouse($scope.selectedWarehouseId).then(function(response){
				fillData();
				 
			});
		};

		$scope.edit_selected_warehouse = function()
		{
			console.log("Promenjeno: "+$scope.selectedWarehouseId+", "+$scope.editWarehouseName+", "+$scope.editWarehouseAddress+", "+$scope.editWarehousePlace+", "+$scope.editWarehouseCompany);
			magaciniService.update_warehouse($scope.selectedWarehouseId, $scope.editWarehouseName, $scope.editWarehouseAddress, $scope.editWarehousePlace, $scope.editWarehouseCompany).then(function(response){
				fillData();
			});
		};

		$scope.closeState = function()
	    {
	      $scope.clear_add();
	  	  $state.go('^',{}, {reload:true});
	    }

	}
];