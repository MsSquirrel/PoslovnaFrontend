module.exports = [
	'$scope', '$http', 'poslovneGodineService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, poslovneGodineService, $stateParams, $window, $state, $rootScope){

		$scope.businessYearId = $stateParams.id;

		$scope.businessYear = 0;
		$scope.editBusinessYearFinished = 0;
   		$scope.editBusinessYearCompany = 0;

		console.log("ID POS GOD "+$scope.businessYearId);

		function fillData()
		{
			poslovneGodineService.get_businessYear_by_id($scope.businessYearId)
				.then(function(response){
				$scope.business = response;

				$scope.editBusinessYear = $scope.business.Godina_Poslovna_godina;
   				$scope.editBusinessYearFinished = $scope.business.Zakljucena_Poslovna_godina;
   				$scope.editBusinessYearCompany = $scope.business.Preduzece.Id_Preduzece;
			});

		};

		fillData();

		$scope.edit_selected_businessYear = function()
    	{
    		console.log("Saljemo "+$scope.selectedBusinessYearId+", "+$scope.editBusinessYear+", "+$scope.editBusinessYearFinished+","+$scope.editBusinessYearCompany);
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
			   	$state.go('^',{}, {reload:true});
		  	});
    	};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};
	}
];