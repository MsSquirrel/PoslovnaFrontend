module.exports = [		
	'$scope', '$http', 'robaService', 'grupeRobaService', 'merneJediniceService', 'preduzecaService','$routeParams','$window', '$state',
	function myController($scope, $http, robaService, grupeRobaService, merneJediniceService, preduzecaService, $routeParams, $window, $state) {	

		$scope.allCategories = {};
		$scope.allMeasUnits = {};
		$scope.allCompanies = {};
		
		$scope.selectedRow = {};
		$scope.selectedGoodsId = -1;
		
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
		    { name:'Naziv_Roba', width:'50%', displayName:'Naziv', cellTooltip: true, headerTooltip: true},
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'20%', displayName: 'Grupa', cellTooltip: true, headerTooltip: true},
			{ name:'Jedinica_mere.Naziv_Jedinica_mere', width:'15%', displayName:'Jedinica mere', cellTooltip: true, headerTooltip: true},
		    { name:'Preduzece.Naziv_Preduzece', width:'15%', displayName: 'Preduzece', cellTooltip: true, headerTooltip: true}
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

		$scope.clear_add = function(){
			$scope.goodsName = "";
			$scope.goodsCategory = "";
			$scope.goodsMeasUnit = "";
			$scope.goodsCompany = "";
	    };

	    $scope.clear_add();

		$scope.add_goods = function()
		{
			robaService.create_goods($scope.goodsId, $scope.goodsName, $scope.goodsCategory, $scope.goodsMeasUnit, $scope.goodsCompany).then(function(response){
				$scope.clear_add();
			 	$state.go('^',{}, {reload:true});

			});
		};

		$scope.remove_selected_goods = function()
		{
			console.log("ID grupe je "+$scope.selectedGoodsId);
			robaService.remove_goods($scope.selectedGoodsId).then(function(response){
				fillData();
				 
			});
		};

		$scope.edit_selected_goods = function()
		{
			console.log("Promenjeno: "+$scope.selectedGoodsId+", "+$scope.editGoodsName+", "+$scope.editGoodsCategory+", "+$scope.editGoodsMeasUnit+", "+$scope.editGoodsCompany);
			robaService.update_goods($scope.selectedGoodsId, $scope.editGoodsName, $scope.editGoodsCategory, $scope.editGoodsMeasUnit, $scope.editGoodsCompany).then(function(response){
				fillData();
			});
		};


		$scope.closeState = function()
	    {
	      $scope.clear_add();
	  	  $state.go('^',{}, {reload:true});
	    }
	}
];