module.exports = [		
	'$scope', '$http', 'robaService', 'grupeRobaService', 'merneJediniceService', 'preduzecaService','$routeParams','$window', '$state', '$stateParams',
	function myController($scope, $http, robaService, grupeRobaService, merneJediniceService, preduzecaService, $routeParams, $window, $state, $stateParams) {	

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
		    { name:'Grupa_roba.Naziv_Grupa_roba', width:'35%', displayName: 'Grupa', cellTooltip: true, headerTooltip: true},
			{ name:'Jedinica_mere.Oznaka_Jedinica_mere', width:'15%', displayName:'Jedinica mere', cellTooltip: true, headerTooltip: true}
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



   	$scope.search = {};
    $scope.search.naziv = '';
    $scope.search.grupa_roba = '';


    $scope.search.iPAS = function(){

   			if($scope.search.naziv != '' || $scope.search.grupa_roba != '' )
   				$state.go('roba', {naziv: $scope.search.naziv, grupaRobaId: $scope.search.grupa_roba});
   		}


    var filterData = function(naziv, grupa_roba){

        var naziv = naziv.trim();
        var grupa_roba = grupa_roba.trim();
        

        if(grupa_roba==='' && naziv==='')
   				return;

		var url_filter = "?$filter="

        
        var prvi= true;
   			
		if(naziv!=''){
			prvi =	false;
			url_filter += "substringof('" + naziv + "', Naziv_Roba) eq true";
		}

		if(grupa_roba!=''){
			if(!prvi){
				url_filter += " and "
			}

			url_filter += "Id_Grupa_roba eq " + grupa_roba;
		}

		console.log(url_filter);
		robaService.get_filtered_goods(url_filter).then(function(response){
			$scope.gridOptions.data = response;
			$scope.search.naziv= '';
			$scope.search.grupa_roba = '';
		});

      }


      $scope.refresh = function(){
			$state.go('roba', {naziv: undefined, grupaRobaId: undefined, preduzeceId: undefined, jedinicaMereId: undefined});
		};


      $scope.nextMeh = function()
      {
         var url_filter = "?$filter=";

         var jedinicaMereId = $stateParams.jedinicaMereId;
         var preduzeceId = $stateParams.preduzeceId;
         console.log("PARAM: "+ jedinicaMereId);

         if(jedinicaMereId==''&& preduzeceId=='')
         {
            return;
         }

         if(jedinicaMereId!='' && jedinicaMereId!=undefined)
         {
            url_filter += "Id_Jedinica_mere eq " + jedinicaMereId;
         }

         if(preduzeceId!='' && preduzeceId!=undefined)
         {
         	 url_filter += "Id_Preduzece eq " + preduzeceId;	
         }

         console.log(url_filter);
         robaService.get_filtered_goods(url_filter).then(function(response){
               $scope.gridOptions.data = response;
         });

      };


		function fillData(){
			if(($stateParams.jedinicaMereId=='' || $stateParams.jedinicaMereId==undefined) && ($stateParams.preduzeceId=='' || $stateParams.preduzeceId==undefined) && ($stateParams.grupaRobaId=='' || $stateParams.grupaRobaId==undefined)){
	    		robaService.get_all_goods().then(function(response){
					$scope.gridOptions.data = response;
				});
    		}
    		else
    		{
    			$scope.nextMeh();
    		}

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

		if($stateParams.naziv == undefined && $stateParams.grupaRobaId == undefined)
			fillData();
		else{
			
			var par_naziv = '';
			var par_grupa_roba = '';
			
			if($stateParams.naziv != undefined)
				par_naziv = $stateParams.naziv;

			if($stateParams.grupaRobaId != undefined)
				par_grupa_roba = $stateParams.grupaRobaId;


			filterData(par_naziv, par_grupa_roba);


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