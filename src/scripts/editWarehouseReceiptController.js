module.exports = [
	'$scope', '$http','prijemniDokumentiService' , 'poslovneGodineService', 'magaciniService','partneriService' , '$routeParams','$window', '$state', '$stateParams', 
	function myController($scope, $http, prijemniDokumentiService,poslovneGodineService, magaciniService,partneriService , $routeParams, $window, $state, $stateParams){
		
		$scope.warehouseReceiptId = $stateParams.id;


		function fillData(){
    		prijemniDokumentiService.get_warehouseReceipt_by_id($scope.warehouseReceiptId).then(function(response){
				$scope.warehouseReceipt = response;

   				$scope.editWarehouseReceiptBusinessYear = $scope.warehouseReceipt.Poslovna_godina.Id_Poslovna_godina;
   				$scope.editWarehouseReceiptWarehouse1 = $scope.warehouseReceipt.Magacin.Id_Magacin;
   				$scope.editWarehouseReceiptWarehouse2 = $scope.warehouseReceipt.Magacin1.Id_Magacin;
   				$scope.editWarehouseReceiptPartner = $scope.warehouseReceipt.Poslovni_partner.Id_Partner;
   				$scope.editWarehouseReceiptExpenses = $scope.warehouseReceipt.Zavisni_troskovi_Prijemni_dokument;
   				$scope.editWarehouseReceiptTransportExpenses = $scope.warehouseReceipt.Transportni_troskovi_Prijemni_dokument;
   				$scope.editDate = $scope.warehouseReceipt.Datum_formiranja_Prijemni_dokument;

				var niz = new Array();
				niz = $scope.editDate.split('-');
				var date = niz[2].split('T')[0];
				var month = niz[1]-1;
				$scope.editDate = new Date(niz[0], month, date);
			});


			poslovneGodineService.get_active_businessYears().then(function(response){
				$scope.allYears = response;
			});

			magaciniService.get_all_warehouses().then(function(response){
				$scope.allWhs = response;
			});

			partneriService.get_all_partners().then(function(response){
				$scope.allPartners = response;
			});
		};

		fillData();  

    	$scope.checkDate = function() {
        if (typeof $scope.editDate !== "undefined") {
	        var dateNow = new Date(); 
	        var dateEntered = new Date($scope.editDate); 
	        $scope.editRecForm.date.$setValidity("minLength", dateNow.getTime() > dateEntered.getTime());
        } else {
          $scope.editRecForm.date.$setValidity("minLength", true);
        }
     	};

    	$scope.edit_warehouseReceipt = function()
    	{	
       		var god = $scope.editDate.getYear()+1900;
    		var m = $scope.editDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editDate.getDate();
    		prijemniDokumentiService.update_warehouseReceipt($scope.warehouseReceiptId,$scope.editWarehouseReceiptBusinessYear,$scope.editWarehouseReceiptWarehouse1,$scope.editWarehouseReceiptWarehouse2,$scope.editWarehouseReceiptPartner,$scope.editWarehouseReceiptExpenses,$scope.editWarehouseReceiptTransportExpenses,date).then(function(response){
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
  			$scope.editDate = new Date();
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
    		$scope.editDate = new Date(year, month, day);
  		};

  		$scope.dateChanged = function() {
			console.log("Date chenged function "+$scope.dt.getMonth() +" "+$scope.dt.getDate());
			console.log("ODABRANO VREME "+$scope.dt);
		}

	}
];