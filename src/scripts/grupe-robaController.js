module.exports = [
	'$scope', '$http', 'grupeRobaService', 'pdvService', 'preduzecaService', '$routeParams', '$window', '$rootScope', '$state', '$stateParams',
	function myController($scope, $http, grupeRobaService, pdvService, preduzecaService, $routeParams, $window, $rootScope, $state, $stateParams) {
		

		$scope.allPdv = {};
		$scope.allCompanies = {};
		
		$scope.selectedRow = {};
		$scope.selectedGroupId = -1;
		
		$scope.editGroupName = "";
		$scope.editGroupPdv = "";
		$scope.editGroupCompany = "";


		$scope.isModal = $state.current.data.isModal;
   		console.log("Grupa robe is modal: "+$scope.isModal);

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Grupa_roba', width:'75%', displayName:'Naziv', cellTooltip: true, headerTooltip: true},
		    { name:'PDV.Naziv_PDV', width:'25%', displayName: 'Po PDV', cellTooltip: true, headerTooltip: true}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				
				$scope.selectedGroupId = $scope.selectedRow.Id_Grupa_roba;
				$scope.selectedGroupName = $scope.selectedRow.Naziv_Grupa_roba;
				$scope.selectedGroupPdv = $scope.selectedRow.PDV.Id_PDV;
				$scope.selectedGroupCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		
				$scope.editGroupName = $scope.selectedRow.Naziv_Grupa_roba;
				$scope.editGroupPdv = $scope.selectedRow.PDV.Id_PDV;
				$scope.editGroupCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
		 	});
   		};	



   		$scope.search = {};
   		$scope.search.naziv= '';

   		$scope.search.iPAS = function(){

   			if($scope.search.naziv != '')
   				$state.go('grupe-roba', {naziv: $scope.search.naziv});
   		}


   		var filterData = function(naziv){

   			var naziv= naziv.trim();

   			var url_filter = "?$filter="
   			
   			if(naziv!=''){
   				url_filter += "substringof('" + naziv + "', Naziv_Grupa_roba) eq true";
   			}else{
   				return;
   			}


   			console.log(url_filter);
   			grupeRobaService.get_filtered_groups(url_filter).then(function(response){
   				$scope.gridOptions.data = response;
   				$scope.search.naziv= '';
   			});
   		}

   		$scope.refresh = function(){
			$state.go('grupe-roba', { naziv: undefined});
		};

   		$scope.nextMeh = function()
      	{
	         var url_filter = "?$filter=";

	         var preduzeceId = $stateParams.preduzeceId;
	         var pdvId = $stateParams.pdvId;
	         console.log("PARAM: "+ pdvId);

	         if(pdvId=='' && preduzeceId=='')
	         {
	            return;
	         }

	         if(pdvId!='' && pdvId!=undefined)
	         {
	            url_filter += "Id_PDV eq " + pdvId;
	         }

	        if(preduzeceId!='' && preduzeceId!=undefined)
        	{
         	 	url_filter += "Id_Preduzece eq " + preduzeceId;	
         	}

	         console.log(url_filter);
	         grupeRobaService.get_filtered_groups(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	         });

      	};

		function fillData(){
			if(($stateParams.pdvId=='' || $stateParams.pdvId==undefined) && ($stateParams.preduzeceId=='' || $stateParams.preduzeceId==undefined)){
	    		grupeRobaService.get_all_groups().then(function(response){
					$scope.gridOptions.data = response;
				});
    		}
    		else
    		{
    			$scope.nextMeh();
    		}	

			pdvService.get_all_pdvs().then(function(response){
				$scope.allPdv = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}

		if($stateParams.naziv == undefined || $stateParams.naziv == ''){
			fillData();
		}else{
			var par_naziv = $stateParams.naziv;
			
			filterData(par_naziv);

			pdvService.get_all_pdvs().then(function(response){
				$scope.allPdv = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}


		$scope.clear_add = function(){

			$scope.groupName = "";
			$scope.groupPdv = "";
			$scope.groupCompany = "";
			if($scope.isModal)
			{
				$scope.$close(true);
			}
			
		};

		$scope.clear_add();

		$scope.add_group = function()
		{
			grupeRobaService.create_group($scope.groupId, $scope.groupName, $scope.groupPdv, $scope.groupCompany).then(function(response){
				$scope.clear_add();
				 $state.go('^',{}, {reload:true});
			});
		};

		$scope.remove_selected_group = function()
		{
			console.log("ID grupe je "+$scope.selectedGroupId);
			grupeRobaService.remove_group($scope.selectedGroupId).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_group = function()
		{
			console.log("Promenjeno: "+$scope.selectedGroupId+", "+$scope.editGroupName+", "+$scope.editGroupPdv+", "+$scope.editGroupCompany);
			grupeRobaService.update_group($scope.selectedGroupId, $scope.editGroupName, $scope.editGroupPdv, $scope.editGroupCompany).then(function(response){
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