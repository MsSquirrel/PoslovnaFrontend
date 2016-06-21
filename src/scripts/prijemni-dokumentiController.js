module.exports = [
	'$scope', '$http','prijemniDokumentiService' , 'poslovneGodineService', 'magaciniService','partneriService' , '$routeParams','$window', '$state', '$stateParams', '$rootScope', 
	function myController($scope, $http, prijemniDokumentiService,poslovneGodineService, magaciniService,partneriService , $routeParams, $window, $state, $stateParams, $rootScope){
		
		$scope.allYears = {};
		$scope.allWarehouses = {};
		$scope.allPartners = {};

		$scope.selectedWarehouseReceiptId = -1;
		$scope.selectedWarehouseReceiptYear = "";
		$scope.selectedWarehouseReceiptPartner = "";
		$scope.selectedWarehouseReceiptWarehouse1 = "";
		$scope.selectedWarehouseReceiptWarehouse2 = "";
		$scope.selectedWarehouseReceiptExpenses = 0;
		$scope.selectedWarehouseReceiptTransportExpenses = 0;
		$scope.selectedWarehouseReceiptDate = "";

		$scope.editWarehouseReceiptYear = "";
		$scope.editWarehouseReceiptPartner = "";
		$scope.editWarehouseReceiptWarehouse1 = "";
		$scope.editWarehouseReceiptWarehouse2 = "";
		$scope.editWarehouseReceiptExpenses = 0;
		$scope.editWarehouseReceiptTransportExpenses = 0;
		$scope.editWarehouseReceiptDate = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
 		 	{ name:'Redni_broj_Prijemni_dokument', width:'7%', displayName: 'Redni broj', cellTooltip: true, headerTooltip: true},
 		 	{ name:'Poslovna_godina.Godina_Poslovna_godina', width:'10%', displayName: 'Poslovna godina', cellTooltip: true, headerTooltip: true},
 		 	{ name:'Magacin1.Naziv_Magacin', width:'20%', displayName: 'Magacin', cellTooltip: true, headerTooltip: true},
 		 	//{ name:'Magacin.Naziv_Magacin', width:'20%', displayName: 'Iz kog magacina', cellTooltip: true, headerTooltip: true},
		    { name:'Poslovni_partner.Naziv_Partner', width:'20%', displayName: 'Partner', cellTooltip: true, headerTooltip: true},
		    { name:'Status_Prijemni_dokument', width:'7%', displayName: 'Status', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_formiranja_Prijemni_dokument', width:'13%', displayName: 'Datum formiranja', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_knjizenja_Prijemni_dokument', width:'13%', displayName: 'Datum knjiženja', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_nabavna_vrednost_Prijemni_dokument', width:'12%', displayName: 'Ukupna nabavna vrednost', cellTooltip: true, headerTooltip: true},
		    { name:'Zavisni_troskovi_Prijemni_dokument', width:'12%', displayName: 'Zavisni troškovi', cellTooltip: true, headerTooltip: true},
		    { name:'Transportni_troskovi_Prijemni_dokument', width:'12%', displayName: 'Transportni troškovi', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupna_vrednost_Prijemni_dokument', width:'12%', displayName: 'Ukupna vrednost', cellTooltip: true, headerTooltip: true}
		  ];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
		          
   				$scope.selectedWarehouseReceiptId = $scope.selectedRow.Id_Prijemni_dokument;
   				$scope.selectedWarehouseReceiptYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
   				$scope.selectedWarehouseReceiptExpenses = $scope.selectedRow.Zavisni_troskovi_Prijemni_dokument;
   				$scope.selectedWarehouseReceiptWarehouse2 = $scope.selectedRow.Magacin1.Id_Magacin;
   				//$scope.selectedWarehouseReceiptWarehouse1 = $scope.selectedRow.Magacin.Id_Magacin;
   				$scope.selectedWarehouseReceiptPartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
   				$scope.selectedWarehouseReceiptTransportExpenses = $scope.selectedRow.Transportni_troskovi_Prijemni_dokument;
   				$scope.selectedWarehouseReceiptDate = $scope.selectedRow.Datum_formiranja_Prijemni_dokument;
          $scope.selectedWarehouseReceiptStatus = $scope.selectedRow.Status_Prijemni_dokument;
          $scope.items = $scope.selectedRow.Stavka_dokumenta;

   				$scope.editWarehouseReceiptBusinessYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
          $scope.editWarehouseReceiptWarehouse1 = $scope.selectedRow.Magacin1.Id_Magacin;
          $scope.editWarehouseReceiptPartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
   				$scope.editWarehouseReceiptExpenses = $scope.selectedRow.Zavisni_troskovi_Prijemni_dokument;
   				//$scope.editWarehouseReceiptWarehouse1 = $scope.selectedRow.Magacin.Id_Magacin;
   				$scope.editWarehouseReceiptTransportExpenses = $scope.selectedRow.Transportni_troskovi_Prijemni_dokument;
   				$scope.editWarehouseReceiptDate = $scope.selectedRow.Datum_formiranja_Prijemni_dokument;

		 	});
   		};


      $scope.search = {};
      $scope.search.redni_broj = '';
      $scope.search.poslovna_godina = '';
      $scope.search.magacin = '';  
      $scope.search.poslovni_partner = '';

      $scope.search.iPAS = function(){

        if($scope.search.redni_broj != '' || $scope.search.poslovna_godina != '' || $scope.search.magacin != '' || $scope.search.poslovni_partner != '')
          $state.go('prijemni-dokumenti', {rbr: $scope.search.redni_broj, poslovnaGodinaId: $scope.search.poslovna_godina, magacinId: $scope.search.magacin, partnerId: $scope.search.poslovni_partner});
      }


      var filterData = function(rbr, pg, magacin, pp){

        if(rbr==='' && pg==='' && magacin==='' && pp==='')
          return;

        var url_filter = "?$filter="
        var prvi= true;

        if(rbr != ''){
          prvi = false;
          url_filter += "Redni_broj_Prijemni_dokument eq " + rbr;
        }

        if(pg != ''){
          if(!prvi){
            url_filter += " and ";
          }else
            prvi = false;

          url_filter += "Id_Poslovna_godina eq " + pg;
        }

        if(magacin != ''){
          if(!prvi){
            url_filter += " and ";
          }else
            prvi = false;

          url_filter += "Id_Magacin eq " + magacin;
        }

        if(pp != ''){
          if(!prvi){
            url_filter += " and ";
          }else
            prvi = false;

          url_filter += "Id_Partner eq " + pp;
        }

        prijemniDokumentiService.get_filtered_warehouseReceipts(url_filter).then(function(response){
          $scope.gridOptions.data = response;
          
          $scope.search.redni_broj = '';
          $scope.search.poslovna_godina = '';
          $scope.search.magacin = '';  
          $scope.search.poslovni_partner = '';
        });
      }

      $scope.refresh = function(){
        $state.go('prijemni-dokumenti', {rbr: undefined, poslovnaGodinaId: undefined, magacinId: undefined, partnerId: undefined});
      };

   		function fillData()
    	{
        
        prijemniDokumentiService.get_all_warehouseReceipts()
    				.then(function(response){
    				$scope.gridOptions.data = response;
  			});
        

  			poslovneGodineService.get_active_businessYears()
  				.then(function(response){
  				$scope.allYears = response;
  			});
  			magaciniService.get_all_warehouses()
  				.then(function(response){
  				$scope.allWhs = response;
  			});
  			partneriService.get_all_partners()
  				.then(function(response){
  				$scope.allPartners = response;
  			});

        setBusinessYearFunction();

    	};      

      function setBusinessYearFunction()
      {
        if($rootScope.businessYear!=-1 && $rootScope.businessYear!=undefined && $rootScope.businessYear!='')
        {
            var url_filter = "?$filter=";
            var businessYear = $rootScope.businessYear;
            url_filter += "Id_Poslovna_godina eq " + businessYear;   
          
           prijemniDokumentiService.get_filtered_warehouseReceipts(url_filter).then(function(response){
                $scope.gridOptions.data = response;
           });
        }
        if($rootScope.businessYear==-1)
        {
            prijemniDokumentiService.get_all_warehouseReceipts()
              .then(function(response){
              $scope.gridOptions.data = response;
           });  
        }
      }

      $rootScope.currentFunction = setBusinessYearFunction;



    	$scope.checkDate = function() {
        if (typeof $scope.dt !== "undefined") {
	        var dateNow = new Date(); 
	        var dateEntered = new Date($scope.dt); 
	        $scope.createRecForm.date.$setValidity("minLength", dateNow.getTime() > dateEntered.getTime());
        } else {
          $scope.createRecForm.date.$setValidity("minLength", true);
        }
     	};

      if($stateParams.rbr == undefined && $stateParams.magacinId == undefined && $stateParams.partnerId == undefined && $stateParams.poslovnaGodinaId==undefined)
    	 fillData();
      else{
        var rbr = ($stateParams.rbr != undefined)?$stateParams.rbr:'';
        var magacin = ($stateParams.magacinId != undefined)?$stateParams.magacinId:'';;
        var pg = ($stateParams.poslovnaGodinaId != undefined)?$stateParams.poslovnaGodinaId:'';
        var pp = ($stateParams.partnerId != undefined)?$stateParams.partnerId:'';

        filterData(rbr, pg, magacin, pp);

        poslovneGodineService.get_active_businessYears()
          .then(function(response){
          $scope.allYears = response;
        });
        magaciniService.get_all_warehouses()
          .then(function(response){
          $scope.allWhs = response;
        });
        partneriService.get_all_partners()
          .then(function(response){
          $scope.allPartners = response;
        });
      }

    	$scope.clear_add = function(){
	        $scope.warehouseReceiptBusinessYear = "";
	        $scope.wareHouseReceiptPartner = "";
	        $scope.warehouseReceiptWarehouse1 = "";
	        $scope.warehouseReceiptWarehouse2 = "";
	        $scope.warehouseReceiptTransportExpenses = 0;
	        $scope.warehouseReceiptExpenses = 0;
	        $scope.warehouseReceiptDate = "";

           var godinaId = $stateParams.poslovnaGodinaId;
           var magacinId = $stateParams.magacinId;
           var partnerId = $stateParams.partnerId;

           if(godinaId!='' && godinaId!=undefined)
           {
              $scope.warehouseReceiptBusinessYear = parseInt(godinaId);
           }

           if(magacinId!='' && magacinId!=undefined)
           {
             $scope.warehouseReceiptWarehouse1 = parseInt(magacinId);
           }

           if(partnerId!='' && partnerId!=undefined)
           {
             $scope.warehouseReceiptPartner = parseInt(partnerId);
           }

          if($scope.isModal)
          {
            $scope.$close(true);
          }

	        //$scope.changeCompany = "";
	        
	      }

      $scope.clear_add();

      $scope.closeState = function()
      {
        $scope.clear_add();
        $state.go('^',{}, {reload:true});
      };

      $scope.add_warehouseReceipt = function()
    	{
    		var god = $scope.dt.getYear()+1900;
    		var m = $scope.dt.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.dt.getDate();

    		prijemniDokumentiService.create_warehouseReceipt($scope.warehouseReceiptBusinessYear, $scope.warehouseReceiptWarehouse1, $scope.warehouseReceiptWarehouse2, 
    			$scope.warehouseReceiptPartner, $scope.warehouseReceiptExpenses, $scope.warehouseReceiptTransportExpenses, date).then(function(response){
	          	$scope.clear_add(); 
	          	$state.go('^',{}, {reload:true});
		  	});
    	};

    	$scope.remove_selected_warehouseReceipt = function()
    	{
    		prijemniDokumentiService.remove_warehouseReceipt($scope.selectedWarehouseReceiptId).then(function(response){
				fillData();
        
			});
    	};

      $scope.izvestaj = function(){

        $http.get('http://localhost:61769/api/pdf/primka/' + $scope.selectedWarehouseReceiptId, {responseType: 'arraybuffer'})
         .success(function (data) {
             var file = new Blob([data], {type: 'application/pdf'});
             var fileURL = URL.createObjectURL(file);
             window.open(fileURL);
        });

     }

    	/*$scope.edit_selected_warehouseReceipt = function()
    	{
    		var god = $scope.dt.getYear()+1900;
    		var m = $scope.dt.getMonth()+1;
    		var date = god+"-"+m+"-"+$scope.dt.getDate();
    		
    		poslovneGodineService.update_businessYear($scope.warehouseReceiptBusinessYear, $scope.warehouseReceiptWarehouse1, $scope.warehouseReceiptWarehouse2, 
    			$scope.warehouseReceiptPartner, $scope.warehouseReceiptExpenses, $scope.warehouseReceiptTransportExpenses, date).then(function(response){
			   	
		  	});
    	};*/

    	$scope.calculate = function(){
    		prijemniDokumentiService.calculate($scope.selectedWarehouseReceiptId).then(function(response){
    			fillData();
    		});
    	}

    	$scope.record = function(){
    		prijemniDokumentiService.record($scope.selectedWarehouseReceiptId).then(function(response){
    			fillData();
    		});
    	}

    	$scope.cancel = function(){
    		prijemniDokumentiService.cancel($scope.selectedWarehouseReceiptId).then(function(response){
    			fillData();
    		});
    	}


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
 		$scope.maxDate = $scope.today();
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