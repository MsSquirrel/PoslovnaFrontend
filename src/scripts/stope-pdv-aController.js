module.exports = [
	'$scope', '$http', 'stopePDVService', 'pdvService','$routeParams','$window', '$state', '$stateParams',
	function myController($scope, $http, stopePDVService, pdvService, $routeParams, $window, $state, $stateParams){

		$scope.allPDVs = {};

		$scope.selectedPdvRateId = -1;
		$scope.selectedPdvRate = 0.00;
		$scope.selectedPdvRateDate = "";
		$scope.selectedPdvRatePdv=0;


		//$scope.editPdvRate = 0.00;
		//$scope.editPdvRateDate = "";
		//$scope.editPdvRatePdv=0;


		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};

		$scope.gridOptions.columnDefs = [
			{ name:'PDV.Naziv_PDV', width:'30%', displayName: 'Za PDV', cellTooltip: true, headerTooltip: true},
		    { name:'Stopa_Stopa_PDV_a', width:'35%', displayName: 'Stopa', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_vazenja_Stopa_PDV_a', width:'35%', displayName: 'Važi od', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true}
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



      $scope.search = {};
      $scope.search.zaPdv= '';


      $scope.search.iPAS = function(){

        if($scope.search.zaPdv != '')
          $state.go('stope-pdv-a', { pdvId: $scope.search.zaPdv});
      }

      var filterData = function(zaPdv){
        
                   
        var url_filter = "?$filter="
        
        url_filter += "Id_PDV eq " + zaPdv;

        stopePDVService.get_filtered_PDVRates(url_filter).then(function(response){
          
          $scope.gridOptions.data = response;
          $scope.search.zaPdv= '';
        });
      }



      $scope.refresh = function(){
        $state.go('stope-pdv-a', {pdvId: undefined});
      };


       
      if($stateParams.pdvId == '' || $stateParams.pdvId == undefined){
          fillData();

      }else{
        
        var par_Id_PDV = $stateParams.pdvId;


        filterData(par_Id_PDV);


        pdvService.get_all_pdvs().then(function(response){
          $scope.allPDVs = response;
        });
      }

    	function fillData()
    	{
        
    	 	stopePDVService.get_all_PDVRates().then(function(response){
    			$scope.gridOptions.data = response;
    		});
        
    		pdvService.get_all_pdvs().then(function(response){
    			$scope.allPDVs = response;
    		});

    	};

      $scope. fillData = fillData;       

    	//fillData();

      $scope.clear_add = function(){
        $scope.pdvRate = "";
        $scope.pdvRateDate = "";
        $scope.pdvRatePdv="";

           var pdvId = $stateParams.pdvId;

           if(pdvId!='' && pdvId!=undefined)
           {
              $scope.pdvRatePdv = parseInt(pdvId);
           }

        if($scope.isModal)
        {
          $scope.$close(true);
        }
      };

      $scope.clear_add();


      $scope.prepareSearch = function() {
         var pdvId = $stateParams.pdvId;
         if(pdvId!='' && pdvId!=undefined)
         {
          $scope.search.zaPdv = parseInt(pdvId);
         }
      }

    	$scope.add_PDVRate = function()
    	{
    		var god = $scope.dt.getYear()+1900;
    		var m = $scope.dt.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.dt.getDate();
    	
    		stopePDVService.create_pdvRate($scope.pdvRateId, $scope.pdvRate, date, $scope.pdvRatePdv).then(function(response){
            $scope.clear_add();
            $state.go('^',{}, {reload:true});
    		});
    	};

    	$scope.remove_PDVRate = function()
    	{
    		stopePDVService.remove_pdvRate($scope.selectedPdvRateId).then(function(response){
    			fillData();
           
          $scope.clear_add();
    		});
    	};


    	$scope.edit_PDVRate = function()
    	{
       	var god = $scope.editPdvRateDate.getYear()+1900;
    		var m = $scope.editPdvRateDate.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.editPdvRateDate.getDate();
    		stopePDVService.update_pdvRate($scope.selectedPdvRateId, $scope.editPdvRate, date ,$scope.editPdvRatePdv).then(function(response){
    			fillData();
    		});
    	};

      $scope.closeState = function()
      {
        $scope.clear_add();
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
    		$scope.dt = new Date(year, month, day);
  		};

  		$scope.dateChanged = function() {
			console.log("Date chenged function "+$scope.dt.getMonth() +" "+$scope.dt.getDate());
			console.log("ODABRANO VREME "+$scope.dt);
		}


	}
];