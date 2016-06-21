module.exports = [
	'$scope', '$http','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, $stateParams, $window, $state, $rootScope){

		$scope.robnaKarticaId = $stateParams.id;

		$http.get("http://localhost:61769/api/robna_kartica/" + $scope.robnaKarticaId)
			.then(function(response){
				$scope.data = response.data;
			});

		
		/*$scope.editMeasUnitName = "";
		$scope.editMeasUnitMark = "";
		console.log("MEAS ID "+ $scope.measUnitId);


		function fillData()
		{
			merneJediniceService.get_measUnit_by_id($scope.measUnitId).then(function(response){
				$scope.measUnit = response;
				$scope.editMeasUnitName = $scope.measUnit.Naziv_Jedinica_mere;
				$scope.editMeasUnitMark = $scope.measUnit.Oznaka_Jedinica_mere;
			});
		}

		fillData();

		$scope.edit_selected_measUnit = function()
		{
			console.log("Promenjeno: "+$scope.measUnitId+", "+$scope.editMeasUnitName+", "+$scope.editMeasUnitMark);
			merneJediniceService.update_measUnit($scope.measUnitId, $scope.editMeasUnitName, $scope.editMeasUnitMark).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};
*/


	}
];