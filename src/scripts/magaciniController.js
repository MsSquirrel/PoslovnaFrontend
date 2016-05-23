module.exports = [
	'$scope', '$http', 'magaciniService', 'mestaService', 'preduzecaService', '$routeParams','$window',
	function myController($scope, $http, magaciniService, mestaService, preduzecaService, $routeParams, $window){
		
		$scope.warehouseId = -1;
		$scope.warehouseName = "";
		$scope.warehouseAddress = "";
		$scope.warehousePlace = "";
		$scope.warehouseCompany = "";
		$scope.allPlaces = {};
		$scope.allCompanies = {};

		$scope.selectedRow = {};
   		$scope.selectedWarehouseId = -1;
   		$scope.selectedWarehouseName = "";
   		$scope.selectedWarehouseAddress = "";
   		$scope.selectedWarehousePlace = "";
   		$scope.selectedWarehouseCompany ="";
   	
		$scope.editWarehouseName = "";
		$scope.editWarehouseAddress = "";
		$scope.editWarehousePlace = "";
		$scope.editWarehouseCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Magacin', width:'30%', displayName:'Naziv magacina'},
		    { name:'Adresa_Magacin', width:'35%', displayName:'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto'},
		    { name:'Preduzece.Naziv_Preduzece', width:'20%', displayName:'Preduzece'}
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

    	function fillData(){
    		magaciniService.get_all_warehouses().then(function(response){
				$scope.gridOptions.data = response;
			});

			mestaService.get_all_places().then(function(response){
				$scope.allPlaces = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		};

		fillData();

		$scope.add_warehouse = function()
		{
			magaciniService.create_warehouse($scope.warehouseId, $scope.warehouseName, $scope.warehouseAddress, $scope.warehousePlace, $scope.warehouseCompany).then(function(response){
				fillData();
			});
		};
	
		$scope.remove_selected_warehouse = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("ID magacina je "+$scope.selectedRow[0].Id_Magacin);
			magaciniService.remove_warehouse($scope.selectedRow[0].Id_Magacin).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_warehouse = function()
		{
			console.log("Promenjeno: "+$scope.selectedWarehouseId+", "+$scope.editWarehouseName+", "+$scope.editWaarehouseAddress+", "+$scope.editWaarehousePlace+", "+$scope.editWaarehouseCompany);
			magaciniService.update_warehouse($scope.selectedWarehouseId, $scope.editWarehouseName, $scope.editWaarehouseAddress, $scope.editWaarehousePlace, $scope.editWaarehouseCompany).then(function(response){
				fillData();
			});
		};
	}
];