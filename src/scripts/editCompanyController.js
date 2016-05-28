module.exports = [
	'$scope', '$http', 'mestaService', 'preduzecaService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, mestaService,preduzecaService,$stateParams, $window, $state, $rootScope){

		$scope.companyId = $stateParams.id;
		console.log('ID: '+$scope.companyId);
		console.log('EDIT company controller');

		$scope.allPlaces = {};


		function fillData(){
    		preduzecaService.get_company_by_id($scope.companyId)
				.then(function(response){
				$scope.company = response;

				$scope.editCompanyName = $scope.company.Naziv_Preduzece;
   				$scope.editCompanyMBR = $scope.company.Maticni_broj_Preduzece;
   				$scope.editCompanyPIB = $scope.company.PIB_Preduzece;
   				$scope.editCompanyAddress = $scope.company.Adresa_Preduzece;
   				$scope.editCompanyPlace = $scope.company.Mesto.Id;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		};

		fillData();

		$scope.edit_selected_company = function(name, mbr, pib, address, place)
		{
			console.log("Promenjeno: "+$scope.companyId+", "+$scope.editCompanyName+", "+$scope.editCompanyMBR+", "+$scope.editCompanyPIB+", "+$scope.editCompanyAddress+", "+$scope.editCompanyPlace);
			preduzecaService.update_company($scope.companyId, $scope.editCompanyName, $scope.editCompanyMBR, $scope.editCompanyPIB, $scope.editCompanyAddress, $scope.editCompanyPlace).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			console.log('HERE');
			$state.go('^',{}, {reload:true});
		};


	}
];