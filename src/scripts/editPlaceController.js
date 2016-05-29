module.exports = [
	'$scope', '$http', 'mestaService', 'mestaService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, mestaService,mestaService,$stateParams, $window, $state, $rootScope){

		$scope.placeId = $stateParams.id;
		$scope.editName = "";
		$scope.editNumber = "";
		console.log("ID MESTA "+$scope.placeId);

		
		function fillData(){
			mestaService.get_place_by_id($scope.placeId)
			.then(function(response){
				$scope.place = response;
				$scope.editName = $scope.place.Naziv_Mesto;
				$scope.editNumber = $scope.place.Postansk__broj_Mesto;
			});
		};

		fillData();

		$scope.edit_selected_place = function()
		{
			console.log("Promenjeno: "+$scope.placeId+", "+$scope.editName+", "+$scope.editNumber);
			mestaService.update_place($scope.placeId, $scope.editName, $scope.editNumber).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};



		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};
	}
];