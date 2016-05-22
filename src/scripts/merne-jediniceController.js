module.exports = [
	'$scope', '$http','merneJediniceService', '$routeParams','$window',
	function myController($scope, $http, merneJediniceService, $routeParams, $window){

		$scope.measUnitId = -1;
		$scope.measUnitName ="";

		$scope.selectedRow =  {};
   		$scope.selectedMeasUnitId = -1;
   		$scope.selectedMeasUnitName = "";

   		$scope.editMeasUnitName = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Jedinica_mere', width:'100%', displayName:'Naziv'}
		];

    	$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedMeasUnitId = $scope.selectedRow.Id_Jedinica_mere;
   				$scope.selectedMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;

   				$scope.editMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;
   			});
   		};


    	function fillData(){
    		merneJediniceService.get_all_measUnits().then(function(response){
    			$scope.gridOptions.data = response;
    		});
    	};

    	fillData();



    	$scope.add_measUnit = function(){
    		merneJediniceService.add_measUnit($scope.measUnitId, $scope.measUnitName).then(function(response){
    			fillData();
    		});
    	};

    	$scope.remove_selected_measUnit = function()
    	{
    		$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
    		merneJediniceService.remove_measUnit($scope.selectedRow[0].Id_Jedinica_mere).then(function(response){
    			fillData();
    		});
    	};

    	$scope.edit_selected_measUnit = function(name)
    	{
    		merneJediniceService.update_measUnit($scope.selectedMeasUnitId, name).then(function(response){
    			fillData();
    		});
    	};

	}
];