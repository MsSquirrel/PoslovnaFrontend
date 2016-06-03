module.exports = [
	'$scope', '$http', 'partneriService' ,'$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, partneriService, $stateParams, $window, $state, $rootScope){

		$scope.partnerId = $stateParams.id;


		function fillData()
		{
			partneriService.get_partner_by_id($scope.partnerId).then(function(response){
				$scope.partner = response;

				$scope.editPartnerName = $scope.partner.Naziv_Partner;
   				$scope.editPartnerMBR = $scope.partner.Maticni_broj_Partner;
   				$scope.editPartnerPIB = $scope.partner.PIB_Partner;
   				$scope.editPartnerAddress = $scope.partner.Adresa_Partner;
   				$scope.editPartnerPlace = $scope.partner.Id;
   				$scope.editPartnerCompany = $scope.partner.Id_Preduzece;
   				$scope.editPartnerType = $scope.partner.Tip_Partner;
			});
		};

		fillData();

		$scope.edit_selected_partner = function()
		{
			partneriService.update_partner($scope.partnerId, $scope.editPartnerName, $scope.editPartnerMBR, $scope.editPartnerPIB, $scope.editPartnerAddress, $scope.editPartnerPlace, $scope.editPartnerCompany, $scope.editPartnerType).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};


		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};

	}
];