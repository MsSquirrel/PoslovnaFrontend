module.exports = [
	'$scope', '$http', 'stavkeDokumenataService', 'prijemniDokumentiService', 'robaService', '$state', '$stateParams',
	function myController($scope, $http, stavkeDokumenataService, prijemniDokumentiService, robaService, $state, $stateParams){

		$scope.documentItemId = $stateParams.id;

    	
		function fillData(){
    		stavkeDokumenataService.get_documentItem_by_id($scope.documentItemId)
				.then(function(response){
				$scope.documentItem = response;

				$scope.editPrimka = $scope.documentItem.Id_Prijemni_dokument;
				$scope.editRoba = $scope.documentItem.Id_Roba;
				$scope.editKolicina = $scope.documentItem.Kolicina_Stavka_dokumenta;
				$scope.editNabCena = $scope.documentItem.Nabavna_vrednost_Stavka_dokumenta;
				$scope.editMarza = $scope.documentItem.Procenat_marze_Stavka_dokumenta;
			});

			prijemniDokumentiService.get_all_warehouseReceipts()
				.then(function(response){
				$scope.allWrs = response;
			});

			robaService.get_all_goods()
				.then(function(response){
				$scope.allItems = response;
			});
		};

		fillData();

    	$scope.edit_documentItem = function()
    	{	
    		stavkeDokumenataService.update_documentItem($scope.documentItemId, $scope.editPrimka, $scope.editRoba, $scope.editKolicina, $scope.editNabCena, $scope.editMarza).then(function(response){
			   	$state.go('^',{}, {reload:true});
		  	});
    	};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};

	}
];