module.exports = [
	'$scope', '$http', 'stopePDVService', 'pdvService','$routeParams','$window',
	function myController($scope, $http, stopePDVService, pdvService, $routeParams, $window){
		

		$scope.pdvRateId = -1;
		$scope.pdvRate = 0.00;
		$scope.pdvRateDate = "";
		$scope.pdvRatePdv=0;

		$scope.allPDVs = {};

		$scope.selectedPdvRateId = -1;
		$scope.selectedPdvRate = 0.00;
		$scope.selectedPdvRateDate = "";
		$scope.selectedPdvRatePdv=0;


		$scope.editPdvRate = 0.00;
		$scope.editPdvRateDate = "";
		$scope.editPdvRatePdv=0;


		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
			{ name:'PDV.Naziv_PDV', width:'30%', displayName: 'Za PDV'},
		    { name:'Stopa_Stopa_PDV_a', width:'35%', displayName: 'Stopa'},
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Vazi od'}
		];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				$scope.selectedPdvRateId = $scope.selectedRow.Id_Stopa_PDV_a;
				$scope.selectedPdvRate = $scope.selectedRow.Stopa_Stopa_PDV_a;
				$scope.selectedPdvRateDate = $scope.selectedRow.Datum_vazenja_Stopa_PDV_a;
				$scope.selectedPdvRatePdv= $scope.selectedRow.Id_PDV;


				$scope.editPdvRate = $scope.selectedPdvRate;
				$scope.editPdvRateDate = $scope.selectedPdvRateDate;
				$scope.editPdvRatePdv=$scope.selectedPdvRatePdv;

   			  });
   		};

    	function fillData()
    	{
    		stopePDVService.get_all_PDVRates().then(function(response){
    			$scope.gridOptions.data = response;
    		});

    		pdvService.get_all_pdvs().then(function(response){
    			$scope.allPDVs = response;
    		});
    	};

    	fillData();

    	$scope.add_PDVRate = function()
    	{
    		var god = $scope.dt.getYear()+1900;
    		var m = $scope.dt.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.dt.getDate();
    		console.log("DATUM "+date);
    		console.log("Uneto "+$scope.pdvRateId+", "+$scope.pdvRate+", "+date+", "+$scope.pdvRatePdv);
    		stopePDVService.create_pdvRate($scope.pdvRateId, $scope.pdvRate, date, $scope.pdvRatePdv).then(function(response){
    			$window.location.reload();
    		});
    	};

    	$scope.remove_PDVRate = function()
    	{
    		stopePDVService.remove_pdvRate($scope.selectedPdvRateId).then(function(response){
    			$window.location.reload();
    		});
    	};


    	$scope.edit_PDVRate = function()
    	{
       		var god = $scope.editPdvRateDate.getYear()+1900;
    		var m = $scope.editPdvRateDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editPdvRateDate.getDate();
    		stopePDVService.update_pdvRate($scope.selectedPdvRateId, $scope.editPdvRate, date ,$scope.editPdvRatePdv).then(function(response){
    			$window.location.reload();
    		});
    	};



    	// time picker
  		 $scope.mytime = new Date();
  		 $scope.options = {
    		hour_step: [1, 2, 3],
    		minute_step: [1, 5, 10, 15, 25, 30]
  		};

 		 $scope.hour_step = 1;
 		 $scope.minute_step = 15;
 		 $scope.ismeridian = true;

		// date picker
 		$scope.open1 = function() {
    	$scope.popup1.opened = true;
  		};
  		
  		$scope.today = function(){
  			$scope.dt = new Date();
  		}

 		$scope.minDate =  new Date();

 		$scope.today();
  		$scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 		$scope.format = $scope.formats[0];
 		

 		 $scope.popup1 = {
    		opened: false
 		 };

  		$scope.dateOptions = {
    		formatYear: 'yy',
    		startingDay: 1
  		};

 		$scope.altInputFormats = ['yyyy/MM/dd'];

 		 $scope.setDate = function(year, month, day) {
    		$scope.dt = new Date(year, month, day);
  		};

  		$scope.dateChanged = function() {
			console.log("Date chenged function "+$scope.dt.getMonth() +" "+$scope.dt.getDate());
			console.log("ODABRANO VREME "+$scope.dt);
		}


	}
];