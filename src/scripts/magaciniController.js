module.exports = [
	'$scope', '$http', 'magaciniService', 'mestaService', 'preduzecaService', '$routeParams','$window',
	function myController($scope, $http, magaciniService, mestaService, preduzecaService, $routeParams, $window){

		$scope.allPlaces = {};
		$scope.allCompanies = {};

		$scope.selectedRow = {};
   		$scope.selectedWarehouseId = -1;
   	
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
		    { name:'Naziv_Magacin', width:'30%', displayName:'Naziv magacina', cellTooltip: true, headerTooltip: true},
		    { name:'Adresa_Magacin', width:'35%', displayName:'Adresa', cellTooltip: true, headerTooltip: true},
		    { name:'Mesto.Naziv_Mesto', width:'15%', displayName: 'Mesto', cellTooltip: true, headerTooltip: true},
		    { name:'Preduzece.Naziv_Preduzece', width:'20%', displayName:'Preduzeće', cellTooltip: true, headerTooltip: true}
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

		$scope.clear_add = function(){
			$scope.warehouseName = "";
			$scope.warehouseAddress = "";
			$scope.warehousePlace = "";
			$scope.warehouseCompany = "";
		};

		$scope.clear_add();

		$scope.add_warehouse = function()
		{
			magaciniService.create_warehouse($scope.warehouseId, $scope.warehouseName, $scope.warehouseAddress, $scope.warehousePlace, $scope.warehouseCompany).then(function(response){
				fillData();
				$scope.clear_add();
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
	}
];