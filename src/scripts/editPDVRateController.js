module.exports = [
	'$scope', '$http', 'stopePDVService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, stopePDVService, $stateParams, $window, $state, $rootScope){

		$scope.pdvRateId = $stateParams.id;
		console.log("ID PDV RATE: "+$scope.pdvRateId);
		$scope.editPdvRateDate = "";
		



		function fillData()
		{
			stopePDVService.get_pdvRate_by_id($scope.pdvRateId).then(function(response){
				$scope.pdvRate = response;
				$scope.editPdvRate = $scope.pdvRate.Stopa_Stopa_PDV_a;
				//$scope.editPdvRateDate = new Date();
				$scope.editPdvRateDate = $scope.pdvRate.Datum_vazenja_Stopa_PDV_a;
				var niz = new Array();
				niz = $scope.editPdvRateDate.split('-');
				var date = niz[2].split('T')[0];
				var month = niz[1]-1;
				console.log(niz[0], month, date);
				$scope.editPdvRateDate = new Date(niz[0], month, date);
				console.log("EDIT PDV DATE: "+$scope.editPdvRateDate);
			});
		};

		fillData();


		$scope.edit_PDVRate = function()
    	{
       		var god = $scope.editPdvRateDate.getYear()+1900;
    		var m = $scope.editPdvRateDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editPdvRateDate.getDate();
    		stopePDVService.update_pdvRate($scope.selectedPdvRateId, $scope.editPdvRate, date ,$scope.editPdvRatePdv).then(function(response){
    			$state.go('^',{}, {reload:true});
    		});
    	};


		$scope.close_edit = function()
		{
			$state.go('^',{}, {reload:true});
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
    		$scope.editPdvRateDate = new Date(year, month, day);
  		};

  		$scope.dateChanged = function() {
			console.log("Date chenged function "+$scope.dt.getMonth() +" "+$scope.dt.getDate());
			console.log("ODABRANO VREME "+$scope.dt);
		}



	}
];