module.exports = [
	'$scope', '$http', 'mestaService', 'merneJediniceService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, mestaService,merneJediniceService,$stateParams, $window, $state, $rootScope){

		$scope.measUnitId = $stateParams.id;
		$scope.editMeasUnitName = "";
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
    
      $(".characters3").on("change paste keyup", function() {
        $scope.isCharacter(this, 3);
      });

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



	}
];