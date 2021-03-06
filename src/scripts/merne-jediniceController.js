module.exports = [
	'$scope', '$http','merneJediniceService', '$routeParams','$window', '$state', '$rootScope',
	function myController($scope, $http, merneJediniceService, $routeParams, $window, $state, $rootScope){


		  $scope.selectedRow =  {};
   		$scope.selectedMeasUnitId = -1;
   		$scope.selectedMeasUnitName = "";
      $scope.selectedMeasUnitMark = "";

      $scope.measUnitName = "";
      $scope.measUnitMark = "";


   		$scope.editMeasUnitName = "";
      $scope.editMeasUnitMark = "";

      $scope.isModal = $state.current.data.isModal;
      console.log("Comapany is modal: "+$scope.isModal);
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Jedinica_mere', width:'80%', displayName:'Naziv', cellTooltip: true, headerTooltip: true },
        { name:'Oznaka_Jedinica_mere', width:'20%', displayName:'Oznaka', cellTooltip: true, headerTooltip: true },
		];

    	$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];

   				$scope.selectedMeasUnitId = $scope.selectedRow.Id_Jedinica_mere;
   				$scope.selectedMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;
          $scope.selectedMeasUnitMark = $scope.selectedRow.Oznaka_Jedinica_mere;

   				$scope.editMeasUnitName = $scope.selectedRow.Naziv_Jedinica_mere;
          $scope.editMeasUnitMark = $scope.selectedRow.Oznaka_Jedinica_mere;
   			});
   		};



      $scope.search = {};
      $scope.search.naziv= '';
      $scope.search.oznaka = '';

      $scope.search.iPAS = function(){

        if($scope.search.naziv != '' || $scope.search.oznaka != '' )
          $state.go('merne-jedinice', {naziv: $scope.search.naziv, oznaka: $scope.search.oznaka});
      }

      var filterData = function(naziv, oznaka){

        if(oznaka==='' && naziv==='')
          return;

        var url_filter = "?$filter="

        var prvi= true;
        
        if(naziv!=''){
          prvi =  false;
          url_filter += "substringof('" + naziv + "', Naziv_Jedinica_mere) eq true";
        }

        if(oznaka!=''){
          if(!prvi){
            url_filter += " and "
          }

          url_filter += "Oznaka_Jedinica_mere eq '" + oznaka + "'";
        }

        console.log(url_filter);
        merneJediniceService.get_filtered_measUnits(url_filter).then(function(response){
          $scope.gridOptions.data = response;
          $scope.search.naziv= '';
          $scope.search.oznaka = '';
        });
      }



      $scope.refresh = function(){
        $state.go('merne-jedinice', { naziv: undefined, oznaka: undefined});
      };


     
    if(($state.params.naziv == undefined && $state.params.oznaka == undefined) || ($state.params.naziv == '' && $state.params.oznaka == ''))
      fillData();
    
    else{
      
      var par_naziv = '';
      var par_oznaka = '';
      
      if($state.params.naziv != undefined)
        par_naziv = $state.params.naziv;

      if($state.params.oznaka != undefined)
        par_oznaka = $state.params.oznaka;


      filterData(par_naziv, par_oznaka);

    }



    	function fillData(){
    		merneJediniceService.get_all_measUnits().then(function(response){
    			$scope.gridOptions.data = response;
    		});
    	};
    
      $scope.clear_add = function(){
        $scope.measUnitName ="";
        if($scope.isModal)
        {
          $scope.$close(true);
        }
      }


      $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      }

      $scope.clear_add();

    	$scope.add_measUnit = function(){
        console.log("MEAS UNIT "+$scope.measUnitName+", "+$scope.measUnitMark);
    		merneJediniceService.add_measUnit($scope.measUnitId, $scope.measUnitName, $scope.measUnitMark).then(function(response){
          $scope.clear_add();
          $state.go('^',{}, {reload:true});
    		});
    	};

    	$scope.remove_selected_measUnit = function()
    	{
    		$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
    		merneJediniceService.remove_measUnit($scope.selectedRow[0].Id_Jedinica_mere).then(function(response){
    			fillData();
           
    		});
    	};

    	$scope.edit_selected_measUnit = function(name, mark)
    	{
    		merneJediniceService.update_measUnit($scope.selectedMeasUnitId, name, mark).then(function(response){
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