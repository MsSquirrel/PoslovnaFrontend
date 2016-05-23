module.exports = [
	'$scope', '$http', 'robaService', 'merneJediniceService', 'preduzecaService', '$routeParams', '$window',
	function myController($scope, $http, robaService, merneJediniceService, preduzecaService, $routeParams, $window){
		
	//'$scope', '$http', 'robaService', 'grupeRobaService', 'merneJediniceService', 'preduzecaService','$routeParams','$window',
	//function myController($scope, $http, robaService, grupeRobaService, merneJediniceService, preduzecaService, $routeParams, $window) {		
				
		$scope.goodsId = -1;
		$scope.goodsName = "";
		$scope.goodsCategory = "";
		$scope.goodsMeasUnit = "";
		$scope.goodsCompany = "";
		
		$scope.allCategories = {};
		$scope.allMeasUnits = {};
		$scope.allCompanies = {};
		
		$scope.selectedRow = {};
		$scope.selectedGoodsId = -1;
		$scope.selectedGoodsName = "";
		$scope.selectedGoodsCategory = "";
		$scope.selectedGoodsMeasUnit = "";
		$scope.selectedGoodsCompany = "";
		
		$scope.editGoodsName = "";
		$scope.editGoodsCategory = "";
		$scope.editGoodsMeasUnit = "";
		$scope.editGoodsCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv'},
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'20%', displayName: 'Grupa'},
			{ name:'Jedinica_mere.Naziv_Jedinica_mere', width:'15%', displayName:'Jedinica mere'},
		    { name:'Preduzece.Naziv_Preduzece', width:'15%', displayName: 'Preduzece'}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				$scope.selectedGoodsId = $scope.selectedRow.Id_Roba;
				$scope.selectedGoodsName = $scope.selectedRow.Naziv_Roba;
				$scope.selectedGoodsCategory = $scope.selectedRow.Grupa_roba.Id_Grupa_roba;
				$scope.selectedGoodsMeasUnit = $scope.selectedRow.Jedinica_mere.Id_Jedinica_mere;
				$scope.selectedGoodsCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		
				$scope.editGoodsName = $scope.selectedRow.Naziv_Roba;
				$scope.editGoodsCategory = $scope.selectedRow.Grupa_roba.Id_Grupa_roba;
				$scope.editGoodsMeasUnit = $scope.selectedRow.Jedinica_mere.Id_Jedinica_mere;
				$scope.editGoodsCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		 	});
   		};	

		function fillData(){
    		robaService.get_all_goods().then(function(response){
				$scope.gridOptions.data = response;
			});

			// TODO proveriti ime funkcije kad bude napisan servis i zameniti prve linije fajla
			//grupeRobaService.get_all_categories().then(function(response){
			//	$scope.allCategories = response;
			//});

			merneJediniceService.get_all_measUnits().then(function(response){
				$scope.allMeasUnits = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}

		fillData();

		$scope.add_goods = function()
		{
			robaService.create_goods($scope.goodsId, $scope.goodsName, $scope.goodsCategory, $scope.goodsMeasUnit, $scope.goodsCompany).then(function(response){
				fillData();
			});
		};

		$scope.remove_selected_goods = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			robaService.remove_goods($scope.selectedRow[0].Id).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_goods = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("Promenjeno: "+$scope.selectedGoodsId+", "+$scope.editGoodsName+", "+$scope.editGoodsCategory+", "+$scope.editGoodsMeasUnit+", "+$scope.editGoodsCompany);
			robaService.update_goods($scope.selectedGoodsId, $scope.editGoodsName, $scope.editGoodsCategory, $scope.editGoodsMeasUnit, $scope.editGoodsCompany).then(function(response){
				fillData();
			});
		};
	}
];