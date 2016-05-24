module.exports = [
	'$scope', '$http', 'grupeRobaService', 'pdvService', 'preduzecaService', '$routeParams', '$window',
	function myController($scope, $http, grupeRobaService, pdvService, preduzecaService, $routeParams, $window) {
		
		$scope.allPdv = {};
		$scope.allCompanies = {};
		
		$scope.selectedRow = {};
		$scope.selectedGroupId = -1;
		$scope.selectedGroupName = "";
		$scope.selectedGroupPdv = "";
		$scope.selectedGroupCompany = "";
		
		$scope.editGroupName = "";
		$scope.editGroupPdv = "";
		$scope.editGroupCompany = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Grupa_roba', width:'55%', displayName:'Naziv'},
		    { name:'PDV.Naziv_PDV', width:'20%', displayName: 'Po PDV'},
		    { name:'Preduzece.Naziv_Preduzece', width:'25%', displayName: 'Preduzece'}
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

		function fillData(){
    		grupeRobaService.get_all_groups().then(function(response){
				$scope.gridOptions.data = response;
			});

			pdvService.get_all_pdvs().then(function(response){
				$scope.allPdv = response;
			});

			preduzecaService.get_all_companies().then(function(response){
				$scope.allCompanies = response;
			});
		}

		fillData();

		$scope.clear_add = function(){

			$scope.groupName = "";
			$scope.groupPdv = "";
			$scope.groupCompany = "";
			
		};

		$scope.clear_add();

		$scope.add_group = function()
		{
			grupeRobaService.create_group($scope.groupId, $scope.groupName, $scope.groupPdv, $scope.groupCompany).then(function(response){
				fillData();
				$scope.clear_add();
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
	}
];