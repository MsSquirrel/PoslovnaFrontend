module.exports = [
	'$scope', '$http', 'magaciniService', '$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, magaciniService, $stateParams, $window, $state, $rootScope){

		$scope.warehouseId = $stateParams.id;
		console.log("Edit wares id : "+$scope.warehouseId);


		function fillData()
		{
			magaciniService.get_warehouse_by_id().then(function(response){
				$scope.warehouse = response;

				$scope.editWarehouseName = $scope.warehouse.Naziv_Magacin;
				$scope.editWarehouseAddress = $scope.warehouse.Adresa_Magacin;
				$scope.editWarehousePlace = $scope.warehouse.Mesto.Id;
				$scope.editWarehouseCompany = $scope.warehouse.Preduzece.Id_Preduzece;
			});	

		};

		fillData();


		$scope.edit_selected_warehouse = function()
		{
			console.log("Promenjeno: "+$scope.selectedWarehouseId+", "+$scope.editWarehouseName+", "+$scope.editWarehouseAddress+", "+$scope.editWarehousePlace+", "+$scope.editWarehouseCompany);
			magaciniService.update_warehouse($scope.selectedWarehouseId, $scope.editWarehouseName, $scope.editWarehouseAddress, $scope.editWarehousePlace, $scope.editWarehouseCompany).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};
	}
];