module.exports = [
	'$scope', '$http', 'grupeRobaService', '$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, grupeRobaService, $stateParams, $window, $state, $rootScope){

		$scope.wareGroupId = $stateParams.id;
		console.log("Edit wares id : "+$scope.wareGroupId);


		function fillData()
		{
			grupeRobaService.get_wareGroup_by_id($scope.wareGroupId).then(function(response){
				$scope.wareGroup = response;

				$scope.editGroupName = $scope.wareGroup.Naziv_Grupa_roba;
				$scope.editGroupPdv = $scope.wareGroup.PDV.Id_PDV;
				$scope.editGroupCompany = $scope.wareGroup.Preduzece.Id_Preduzece;
			});

		};

		fillData();

		$scope.edit_selected_group = function()
		{
			console.log("Promenjeno: "+$scope.selectedGroupId+", "+$scope.editGroupName+", "+$scope.editGroupPdv+", "+$scope.editGroupCompany);
			grupeRobaService.update_group($scope.selectedGroupId, $scope.editGroupName, $scope.editGroupPdv, $scope.editGroupCompany).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};
	}
];