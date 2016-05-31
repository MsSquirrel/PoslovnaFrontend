module.exports = [
	'$scope', '$http','pdvService', '$routeParams','$window', '$state', '$stateParams',
	function myController($scope, $http, pdvService, $routeParams, $window, $state, $stateParams){


		$scope.selectedRow = {};
		$scope.selectedPdvId = -1;
		$scope.selectedPdvName = "";

		$scope.editPdvName = "";
		$scope.isModal = $state.current.data.isModal;
		console.log("PDV CTRL is modal: "+$scope.isModal);
		
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
   				if ($scope.selectedRow != null)
					$(".edit-btn, .remove-btn").attr("disabled", false);
				else
					$(".edit-btn, .remove-btn").attr("disabled", true);
				
   				$scope.selectedPdvId = $scope.selectedRow.Id_PDV;
   				$scope.selectedPdvName = $scope.selectedRow.Naziv_PDV;
   				$scope.editPdvName = $scope.selectedRow.Naziv_PDV;
		  	});
   		};



   		$scope.search = {};
   		$scope.search.naziv= '';

   		$scope.search.filterData = function(){

   			var naziv= $scope.search.naziv.trim();

   			var url_filter = "?$filter="
   			
   			if(naziv!=''){
   				prvi =	false;
   				url_filter += "substringof('" + naziv + "', Naziv_PDV) eq true";
   			}else{
   				return;
   			}


   			console.log(url_filter);
   			pdvService.get_filtered_pdvs(url_filter).then(function(response){
   				$scope.gridOptions.data = response;
   			});
   		}



   		function fillData(){
    		pdvService.get_all_pdvs()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		};
		$(".edit-btn, .remove-btn").attr("disabled", true);

		$scope.fillData = fillData;

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
				if($scope.isModal){
					$scope.$close(true);
				}
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.remove_selected_pdv = function()
		{
			pdvService.remove_pdv($scope.selectedPdvId).then(function(response){
				fillData();
				$(".edit-btn, .remove-btn").attr("disabled", true);
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
	      if($scope.isModal){
				$scope.$close(true);
		  }
	  	  $state.go('^',{}, {reload:true});
	    }
	}
];