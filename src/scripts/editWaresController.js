module.exports = [
	'$scope', '$http', 'robaService','grupeRobaService','merneJediniceService','preduzecaService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, robaService,grupeRobaService, merneJediniceService, preduzecaService,$stateParams, $window, $state, $rootScope){


		$scope.goodsId = $stateParams.id;
		console.log("ID ROBE JE: "+$scope.goodsId);

		$scope.editGoodsName = "";
		$scope.editGoodsCategory = "";
		$scope.editGoodsMeasUnit = "";
		$scope.editGoodsCompany = "";

		function fillData()
		{	

			robaService.get_goods_by_id($scope.goodsId).then(function(response){
				$scope.goods = response;

				$scope.editGoodsName = $scope.goods.Naziv_Roba;
				$scope.editGoodsCategory = $scope.goods.Grupa_roba.Id_Grupa_roba;
				$scope.editGoodsMeasUnit = $scope.goods.Jedinica_mere.Id_Jedinica_mere;
				$scope.editGoodsCompany = $scope.goods.Preduzece.Id_Preduzece;
			});

			grupeRobaService.get_all_groups().then(function(response){
				$scope.allCategories = response;
			});

			merneJediniceService.get_all_measUnits().then(function(response){
				$scope.allMeasUnits = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}

		fillData();


	  	$scope.edit_selected_goods = function()
		{
			console.log("Promenjeno: "+$scope.selectedGoodsId+", "+$scope.editGoodsName+", "+$scope.editGoodsCategory+", "+$scope.editGoodsMeasUnit+", "+$scope.editGoodsCompany);
			robaService.update_goods($scope.selectedGoodsId, $scope.editGoodsName, $scope.editGoodsCategory, $scope.editGoodsMeasUnit, $scope.editGoodsCompany).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
		};

	}
];