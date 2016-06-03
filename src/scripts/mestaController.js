module.exports = [
	'$scope', '$http', 'mestaService', '$stateParams','$window', '$state', '$rootScope', '$state',
	function myController($scope, $http, mestaService,$stateParams, $window, $state, $rootScope, $state){


		$scope.placeUrl = "";
		$scope.selectedPlaceId = "-1";
		$scope.selectedPlaceName="";
		$scope.selectedPlaceNumber="";
		$scope.selectedRow = {};
		$scope.editName="";
		$scope.editNumber = "";

		$scope.isModal = $state.current.data.isModal;
		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };

		  $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv', cellTooltip: true, headerTooltip: true},
		    { name:'Postansk__broj_Mesto', width:'50%', displayName: 'Poštanski broj', cellTooltip: true, headerTooltip: true}, 
		  ];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
					 
   				$scope.selectedPlaceId = $scope.selectedRow.Id;
   				$scope.selectedPlaceName = $scope.selectedRow.Naziv_Mesto;
   				$scope.selectedPlaceNumber = $scope.selectedRow.Postansk__broj_Mesto;
   				$scope.editName = $scope.selectedPlaceName;
   				$scope.editNumber = $scope.selectedPlaceNumber;

   				console.log("place selection changed");
		  });
   		};


   		$scope.search = {};
   		$scope.search.naziv= '';
   		$scope.search.postanski_broj = '';

   		$scope.search.iPAS = function(){

   			if($scope.search.naziv != '' || $scope.search.postanski_broj != '' )
   				$state.go('mesta', {naziv: $scope.search.naziv, pb: $scope.search.postanski_broj});
   		}

   		var filterData = function(naziv,pb){

   			if(pb==='' && naziv==='')
   				return;

   			var url_filter = "?$filter="

   			var prvi= true;
   			
   			if(naziv!=''){
   				prvi =	false;
   				url_filter += "substringof('" + naziv + "', Naziv_Mesto) eq true";
   			}

   			if(pb!=''){
   				if(!prvi){
   					url_filter += " and "
   				}

   				url_filter += "Postansk__broj_Mesto eq '" + pb + "'";
   			}

   			console.log(url_filter);
   			mestaService.get_filtered_places(url_filter).then(function(response){
   				$scope.gridOptions.data = response;
   				$scope.search.naziv= '';
   				$scope.search.postanski_broj = '';
   			});
   		}


   		$scope.nextCompany = function()
   		{

   
   		};

		
		function fillData(){
    		mestaService.get_all_places()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		}
		
		$scope.refresh = function(){
			$state.go('mesta', { naziv: undefined, pb: undefined});
		};


		 
		if(($stateParams.naziv == undefined && $stateParams.pb == undefined) || ($stateParams.naziv == '' && $stateParams.pb == ''))
			fillData();
		else{
			
			var par_naziv = '';
			var par_pb = '';
			
			if($stateParams.naziv != undefined)
				par_naziv = $stateParams.naziv;

			if($stateParams.pb != undefined)
				par_pb = $stateParams.pb;


			filterData(par_naziv, par_pb);

		}




		console.log("MESTO CONTROLLER");
		console.log("IS MODAL: "+$scope.isModal);

		$scope.clear_add = function(){
			
			$scope.placeName = "";
			$scope.placeNumber = "";
			if($scope.isModal){
				$scope.$close(true);
			}
			// 
			console.log("clear_add");
		};

		$scope.add_place = function()
		{
			mestaService.create_place($scope.placeId, $scope.placeName, $scope.placeNumber).then(function(response){
				$scope.clear_add();
				$state.go('^',{}, {reload:true});
			});

		};

		$scope.remove_selected_place = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			mestaService.remove_place($scope.selectedRow[0].Id).then(function(response){
				fillData();
				 
			});
		};

		$scope.edit_selected_place = function(name, number)
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			alert($scope.selectedRow);
			console.log("Promenjeno: "+$scope.selectedRow[0].Id+","+name+", "+number);
			mestaService.update_place($scope.selectedRow[0].Id, name, number).then(function(response){
				fillData();
			});
		};

		$scope.closeState = function()
	    {
	      $scope.clear_add();
	  	  $state.go('^',{}, {reload:true});
	    }

		/*
		$scope.dismiss = function() {
				console.log('dismiss');
                $scope.$dismiss();
              };

        $scope.save = function() {
        		console.log('save');
               $scope.$close(true);
        };
		*/

	}
];