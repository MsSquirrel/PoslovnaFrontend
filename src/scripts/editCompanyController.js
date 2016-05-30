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

		$(".positiveInteger8").on("change paste keyup", function() {
			$scope.isPositiveInteger(this, 8);
		});
		$(".positiveInteger10").on("change paste keyup", function() {
			$scope.isPositiveInteger(this, 10);
		});

		fillData();

		$scope.edit_selected_company = function(name, mbr, pib, address, place)
		{
			preduzecaService.update_company($scope.companyId, $scope.editCompanyName, $scope.editCompanyMBR, $scope.editCompanyPIB, $scope.editCompanyAddress, $scope.editCompanyPlace).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};


	}
];