module.exports = [
	'$scope', '$http', 'mestaService', '$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, mestaService,$stateParams, $window, $state, $rootScope){


		$scope.placeUrl = "";
		$scope.selectedPlaceId = "-1";
		$scope.selectedPlaceName="";
		$scope.selectedPlaceNumber="";
		$scope.selectedRow = {};
		$scope.editName="";
		$scope.editNumber = "";

		$scope.isModal = $stateParams.isModal;
		
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
		
		$(".positiveInteger").blur(function() {
			$scope.isPositiveInteger(this);
		});

		fillData();
		console.log("MESTO CONTROLLER");
		console.log("IS MODAL: "+$scope.isModal);

		$scope.clear_add = function(){
			
			$scope.placeName = "";
			$scope.placeNumber = "00000";
			if($scope.isModal){
				$scope.$close(true);
			}
			$scope.clearInput($("h2").parent("div"));
			console.log("clear_add");
		};

		$scope.add_place = function()
		{
			mestaService.create_place($scope.placeId, $scope.placeName, $scope.placeNumber).then(function(response){
				$scope.clear_add();
				$state.go('^',{}, {reload:true});
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