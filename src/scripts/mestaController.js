module.exports = [
	'$scope', '$http', 'mestaService', '$routeParams','$window', '$state', '$rootScope',
	function myController($scope, $http, mestaService,$routeParams, $window, $state, $rootScope){

		$scope.placeUrl = "";
		$scope.selectedPlaceId = "-1";
		$scope.selectedPlaceName="";
		$scope.selectedPlaceNumber="";
		$scope.selectedRow = {};
		$scope.editName="";
		$scope.editNumber = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };

		  $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv', cellTooltip: true, headerTooltip: true},
		    { name:'Postansk__broj_Mesto', width:'50%', displayName: 'Poštanski broj', cellTooltip: true, headerTooltip: true}, 
		  ];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedPlaceId = $scope.selectedRow.Id;
   				$scope.selectedPlaceName = $scope.selectedRow.Naziv_Mesto;
   				$scope.selectedPlaceNumber = $scope.selectedRow.Postansk__broj_Mesto;
   				$scope.editName = $scope.selectedPlaceName;
   				$scope.editNumber = $scope.selectedPlaceNumber;
		  });
   		};

		
		function fillData(){
    		mestaService.get_all_places()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		}

		
		fillData();
		console.log("MESTO CONTROLLER");

		$scope.clear_add = function(){
			
			$scope.placeName = "";
			$scope.placeNumber = "00000";
			//$scope.$close(true);
			$state.go('^');
		};

		$scope.add_place = function()
		{
			mestaService.create_place($scope.placeId, $scope.placeName, $scope.placeNumber).then(function(response){
				fillData();
				$scope.clear_add();
			}).then(function() {
				//$scope.$close(true);
				//$state.go('^');
				//$state.go($rootScope.previousState);
			});

		};

		$scope.remove_selected_place = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			mestaService.remove_place($scope.selectedRow[0].Id).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_place = function(name, number)
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			alert($scope.selectedRow);
			console.log("Promenjeno: "+$scope.selectedRow[0].Id+","+name+", "+number);
			mestaService.update_place($scope.selectedRow[0].Id, name, number).then(function(response){
				fillData();
			});
		};

		/*
		$scope.dismiss = function() {
				console.log('dismiss');
                $scope.$dismiss();
              };

        $scope.save = function() {
        		console.log('save');
               $scope.$close(true);
        };
		*/

	}
];