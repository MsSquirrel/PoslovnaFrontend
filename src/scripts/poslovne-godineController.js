module.exports = [
	'$scope', '$http', 'poslovneGodineService', 'preduzecaService', '$routeParams','$window',
	function myController($scope, $http, poslovneGodineService, preduzecaService, $routeParams, $window){

		$scope.businessYearId = -1;
		$scope.businessYear = 0;
		$scope.businessYearFinished = 0;
		$scope.businessYearCompany="";
		$scope.changeCompany = "";

		$scope.allCompanies = {};

		$scope.selectedRow = {};
		$scope.selectedBusinessYearId = -1;
   		$scope.selectedBusinessYear = 0;
   		$scope.selectedBusinessYearFinished = 0;
   		$scope.selectedBusinessYearCompany = "";

   		$scope.editBusinessYear = 0;
   		$scope.editBusinessYearFinished = 0;
   		$scope.editBusinessYearCompany = 0;
	
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 
		 $scope.gridOptions.columnDefs = [
		    { name:'Godina_Poslovna_godina', width:'25%', displayName: 'Poslovna godina'},
		    { name:'Zakljucena_Poslovna_godina', width:'25%', displayName: 'Zaključena'},
		    { name:'Preduzece.Naziv_Preduzece', width:'50%', displayName: 'Preduzeće'},
		  ];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
   				$scope.selectedBusinessYearId = $scope.selectedRow.Id_Poslovna_godina;
   				$scope.selectedBusinessYear = $scope.selectedRow.Godina_Poslovna_godina;
   				$scope.selectedBusinessYearFinished = $scope.selectedRow.Zakljucena_Poslovna_godina;
   				$scope.selectedBusinessYearCompany = $scope.selectedRow.Preduzece.Id_Preduzece;

   				$scope.editBusinessYear = $scope.selectedRow.Godina_Poslovna_godina;
   				$scope.editBusinessYearFinished = $scope.selectedRow.Zakljucena_Poslovna_godina;
   				$scope.editBusinessYearCompany = $scope.selectedRow.Preduzece.Id_Preduzece;

		 	});
   		};

    	function fillData()
    	{
    		poslovneGodineService.get_all_businessYears()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			preduzecaService.get_all_companies()
				.then(function(response){
				$scope.allCompanies = response;
			});
    	};

    	fillData();

    	$scope.add_businessYear = function()
    	{
    		poslovneGodineService.create_businessYear($scope.businessYearId, $scope.businessYear, $scope.businessYearFinished, $scope.businessYearCompany).then(function(response){
				$window.location.reload();
			});
    	};

    	$scope.remove_selected_businessYear = function()
    	{
    		poslovneGodineService.remove_businessYear($scope.selectedBusinessYearId).then(function(response){
				$window.location.reload();
			});
    	};


    	$scope.edit_selected_businessYear = function()
    	{
    		console.log("Saljemo "+$scope.selectedBusinessYearId+", "+$scope.editBusinessYear+", "+$scope.editBusinessYearFinished+","+$scope.editBusinessYearCompany);
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
				$window.location.reload();
			});
    	}

	}
];