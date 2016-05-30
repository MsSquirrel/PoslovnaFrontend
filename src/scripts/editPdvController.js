module.exports = [
	'$scope', '$http', 'pdvService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, pdvService,$stateParams, $window, $state, $rootScope){

		$scope.pdvId = $stateParams.id;
		$scope.editPdvName = "";

		function fillData(){
			pdvService.get_pdv_by_id($scope.pdvId).then(function(response){
				$scope.pdv = response;
				$scope.editPdvName = $scope.pdv.Naziv_PDV;
			});
		}

		fillData();

		$scope.edit_selected_pdv = function()
		{
			pdvService.update_pdv($scope.pdvId, $scope.editPdvName).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};

	}
];