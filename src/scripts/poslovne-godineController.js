module.exports = [
	'$scope', '$http', 'poslovneGodineService', 'preduzecaService', '$routeParams','$window', '$state',
	function myController($scope, $http, poslovneGodineService, preduzecaService, $routeParams, $window, $state){


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
		    { name:'Godina_Poslovna_godina', width:'25%', displayName: 'Poslovna godina', cellTooltip: true, headerTooltip: true},
		    { name:'Zakljucena_Poslovna_godina', width:'25%', displayName: 'Zaključena', cellFilter: 'true_false', cellTooltip: true, headerTooltip: true},
		    { name:'Preduzece.Naziv_Preduzece', width:'50%', displayName: 'Preduzeće', cellTooltip: true, headerTooltip: true},
		  ];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
          if ($scope.selectedRow != null)
            $(".edit-btn, .remove-btn").attr("disabled", false);
          else
            $(".edit-btn, .remove-btn").attr("disabled", true);

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
    
      $(".positiveInteger4").on("change paste keyup", function() {
        $scope.isPositiveInteger(this, 4);
      });
      $(".edit-btn, .remove-btn").attr("disabled", true);

    	fillData();

      $scope.clear_add = function(){
        $scope.businessYear = 0;
        $scope.businessYearFinished = 0;
        $scope.businessYearCompany="";
        $scope.changeCompany = "";
        $scope.clearInput($("h2").parent("div"));
      }

      $scope.clear_add();

    	$scope.add_businessYear = function()
    	{
    		poslovneGodineService.create_businessYear($scope.businessYearId, $scope.businessYear, $scope.businessYearFinished, $scope.businessYearCompany).then(function(response){
          $scope.clear_add(); 
          $state.go('^',{}, {reload:true});
		  	});
    	};

    	$scope.remove_selected_businessYear = function()
    	{
    		poslovneGodineService.remove_businessYear($scope.selectedBusinessYearId).then(function(response){
				fillData();
        $(".edit-btn, .remove-btn").attr("disabled", true);
			});
    	};


    	$scope.edit_selected_businessYear = function()
    	{
    		console.log("Saljemo "+$scope.selectedBusinessYearId+", "+$scope.editBusinessYear+", "+$scope.editBusinessYearFinished+","+$scope.editBusinessYearCompany);
    		poslovneGodineService.update_businessYear($scope.selectedBusinessYearId, $scope.editBusinessYear, $scope.editBusinessYearFinished, $scope.editBusinessYearCompany).then(function(response){
			   	
		  	});
    	};


      $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      };

	}
];