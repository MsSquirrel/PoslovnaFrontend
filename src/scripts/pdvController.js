module.exports = [
	'$scope', '$http','pdvService', '$routeParams','$window', '$state',
	function myController($scope, $http, pdvService, $routeParams, $window, $state){


		$scope.selectedRow = {};
		$scope.selectedPdvId = -1;
		$scope.selectedPdvName = "";

		$scope.editPdvName = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_PDV', width:'100%', displayName: 'Naziv', cellTooltip: true, headerTooltip: true}
		];

    	$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;
   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedPdvId = $scope.selectedRow.Id_PDV;
   				$scope.selectedPdvName = $scope.selectedRow.Naziv_PDV;
   				$scope.editPdvName = $scope.selectedRow.Naziv_PDV;
		  	});
   		};

   		function fillData(){
    		pdvService.get_all_pdvs()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		};

		fillData();

		$scope.clear_add = function(){
			$scope.pdvName = "";
	    }

	    $scope.clear_add();

		$scope.add_pdv = function()
		{
			console.log("HERE "+$scope.pdvName);
			pdvService.create_pdv($scope.pdvId, $scope.pdvName).then(function(response){
				$scope.clear_add();
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.remove_selected_pdv = function()
		{
			pdvService.remove_pdv($scope.selectedPdvId).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_pdv = function(name)
		{
			pdvService.update_pdv($scope.selectedPdvId, name).then(function(response){
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