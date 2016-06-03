module.exports = [
	'$scope', '$http', 'faktureService', 'poslovneGodineService', 'partneriService', '$routeParams', '$window','$state','$stateParams',
	function myController($scope, $http, faktureService, poslovneGodineService, partneriService, $routeParams, $window, $state,$stateParams){
		
		$scope.invoiceId = -1;
		$scope.invoiceNumber = "";
		$scope.invoiceYear = "";
		$scope.invoicePartner = "";
		$scope.invoiceDate = "";
		$scope.invoiceCurrency = "";
		$scope.invoiceRabat = "";
		$scope.invoiceIznosBezPdv = "";
		$scope.invoiceTotalPdv = "";
		$scope.invoiceTotalPlacanje = "";

		$scope.allYears = {};
		$scope.allPartners = {};

		$scope.selectedRow = {};
		$scope.selectedInvoiceId = -1;

		$scope.editInvoiceNumber = "";
		$scope.editInvoiceYear = "";
		$scope.editInvoicePartner = "";
		$scope.editInvoiceDate = "";
		$scope.editInvoiceCurrency = "";
		$scope.editInvoiceRabat = "";
		$scope.editInvoiceIznosBezPdv = "";
		$scope.editInvoiceTotalPdv = "";
		$scope.editInvoiceTotalPlacanje = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		};
 			
		$scope.gridOptions.columnDefs = [
			{ name:'Broj_fakture_Faktura', width:'15%', displayName: 'Broj fakture', cellTooltip: true, headerTooltip: true},
			{ name:'Poslovni_partner.Naziv_Partner', width:'25%', displayName: 'Partner', cellTooltip: true, headerTooltip: true},
		    { name:'Poslovna_godina.Godina_Poslovna_godina', width:'10%', displayName: 'Poslovna godina', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_fakture_Faktura', width:'15%', displayName: 'Datum fakture', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Datum_valute_Faktura', width:'15%', displayName: 'Datum valute', cellFilter: 'date:\'dd.MM.yyyy\'', cellTooltip: true, headerTooltip: true},
		    { name:'Ukupno_za_placanje_Faktura', width:'20%', displayName: 'Ukupno za plaćanje', cellTooltip: true, headerTooltip: true}
		];

		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];
				$scope.selectedInvoiceId = $scope.selectedRow.Id_Faktura;
				$scope.selectedInvoiceNumber = $scope.selectedRow.Broj_fakture_Faktura;
				$scope.selectedInvoiceYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
				$scope.selectedInvoicePartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
				$scope.selectedDt1 = $scope.selectedRow.Datum_fakture_Faktura;
				$scope.selectedDt2 = $scope.selectedRow.Datum_valute_Faktura;
				$scope.selectedInvoiceRabat = $scope.selectedRow.Ukupan_rabat_Faktura;
				$scope.selectedInvoiceIznosBezPdv = $scope.selectedRow.Ukupan_iznos_bez_PDV_a_Faktura;
				$scope.selectedInvoiceTotalPdv = $scope.selectedRow.Ukupan_PDV_Faktura;
				$scope.selectedInvoiceTotalPlacanje = $scope.selectedRow.Ukupno_za_placanje_Faktura;

				$scope.editInvoiceNumber = $scope.selectedRow.Broj_fakture_Faktura;
				$scope.editInvoiceYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
				$scope.editInvoicePartner = $scope.selectedRow.Poslovni_partner.Id_Partner;

		        $scope.editDt1 = ($scope.selectedRow.Datum_fakture_Faktura).split("T")[0];
				$scope.editDt2 = ($scope.selectedRow.Datum_valute_Faktura).split("T")[0];

				$scope.editInvoiceRabat = $scope.selectedRow.Ukupan_rabat_Faktura;
				$scope.editInvoiceIznosBezPdv = $scope.selectedRow.Ukupan_iznos_bez_PDV_a_Faktura;
				$scope.editInvoiceTotalPdv = $scope.selectedRow.Ukupan_PDV_Faktura;
				$scope.editInvoiceTotalPlacanje = $scope.selectedRow.Ukupno_za_placanje_Faktura;

				//$('$scope.editDt1').datepicker('setDate', $scope.editDt1);
				//$('#datetimepicker1').datetimepicker({defaultDate: $scope.editDt1});
		  });
   		};

   		 $scope.nextMeh = function()
     	 {

	         var url_filter = "?$filter=";

	         var poslovnaGodinaId = $stateParams.poslovnaGodinaId;
	         var partnerId = $stateParams.partnerId;
	         console.log("PARAM: "+ poslovnaGodinaId);

	         if(poslovnaGodinaId=='' && partnerId=='')
	         {
	            return;
	         }

	         if(poslovnaGodinaId!='' && poslovnaGodinaId!=undefined)
	         {
	             url_filter += "Id_Poslovna_godina eq " + poslovnaGodinaId;   
	         }

	         if(partnerId!='' && partnerId!=undefined)
         	 {
            	 url_filter += "Id_Partner eq " + partnerId;   
         	 }

	         faktureService.get_filtered_invoices(url_filter).then(function(response){
	               $scope.gridOptions.data = response;
	         });
         }


    	function fillData(){
    		if(($stateParams.poslovnaGodinaId=='' || $stateParams.poslovnaGodinaId==undefined) && ($stateParams.partnerId=='' || $stateParams.partnerId==undefined)){
	    		faktureService.get_all_invoices().then(function(response){
					$scope.gridOptions.data = response;
				});
    		}
    		else
    		{
    			$scope.nextMeh();
    		}

			poslovneGodineService.get_all_businessYears().then(function(response){
				$scope.allYears = response;
			});

			partneriService.get_all_partners().then(function(response){
				$scope.allPartners = response;
			});
		};

		fillData();

		$scope.clear_add = function() {
			$scope.invoiceNumber = "";
			$scope.invoiceYear = "";
			$scope.invoicePartner = "";
			$scope.dt1 = ""; // datum faktude
			$scope.dt2 = ""; // datum valute
			$scope.invoiceRabat = "";
			$scope.invoiceIznosBezPdv = "";
			$scope.invoiceTotalPdv = "";
			$scope.invoiceTotalPlacanje = "";
			 
		}

		$scope.clear_add();

		$scope.add_invoice = function()
		{
    		var god1 = $scope.dt1.getYear()+1900;
    		var m1 = $scope.dt1.getMonth()+1;
    		var invoiceDate = god1+"-"+m1+"-"+$scope.dt1.getDate();
    		var god2 = $scope.dt2.getYear()+1900;
    		var m2 = $scope.dt2.getMonth()+1;
    		var invoiceCurrency = god2+"-"+m2+"-"+$scope.dt2.getDate();
			console.log("Unesi: "+$scope.invoiceId+", "+$scope.invoiceNumber+", "+$scope.invoiceYear+", "+$scope.invoicePartner+", "+invoiceDate+", "+invoiceCurrency+", "+$scope.invoiceRabat+", "+$scope.invoiceIznosBezPdv+", "+$scope.invoiceTotalPdv+", "+$scope.invoiceTotalPlacanje);
			faktureService.create_invoice($scope.invoiceId, $scope.invoiceNumber, $scope.invoiceYear, $scope.invoicePartner, invoiceDate, invoiceCurrency, $scope.invoiceRabat, $scope.invoiceIznosBezPdv, $scope.invoiceTotalPdv, $scope.invoiceTotalPlacanje).then(function(response){
				fillData();
				$scope.clear_add();
			});
		};
	
		$scope.remove_selected_invoice = function()
		{
			console.log("ID fakture je "+$scope.selectedInvoiceId);
			faktureService.remove_invoice($scope.selectedInvoiceId).then(function(response){
				fillData();
			});
		};

		$scope.edit_selected_invoice = function()
		{
    		var god1 = $scope.editDt1.getYear()+1900;
    		var m1 = $scope.editDt1.getMonth()+1;
    		var editInvoiceDate = god1+"-"+m1+"-"+$scope.editDt1.getDate();
    		var god2 = $scope.editDt2.getYear()+1900;
    		var m2 = $scope.editDt2.getMonth()+1;
    		var editInvoiceCurrency = god2+"-"+m2+"-"+$scope.editDt2.getDate();
			console.log("Promenjena: "+$scope.selectedInvoiceId+", "+$scope.editInvoiceNumber+", "+$scope.editInvoiceYear+", "+$scope.editInvoicePartner+", "+editInvoiceDate+", "+editInvoiceCurrency+", "+$scope.editInvoiceRabat+", "+$scope.editInvoiceIznosBezPdv+", "+$scope.editInvoiceTotalPdv+", "+$scope.editInvoiceTotalPlacanje);
			faktureService.update_invoice($scope.selectedInvoiceId, $scope.editInvoiceNumber, $scope.editInvoiceYear, $scope.editInvoicePartner, editInvoiceDate, editInvoiceCurrency, $scope.editInvoiceRabat, $scope.editInvoiceIznosBezPdv, $scope.editInvoiceTotalPdv, $scope.editInvoiceTotalPlacanje).then(function(response){
				fillData();
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
 		$scope.open2 = function() {
    		$scope.popup2.opened = true;
  		};
  		
  		$scope.today = function(){
  			$scope.dt2 = new Date();
  		}
  		$scope.today = function(){
  			$scope.dt1 = new Date();
  		}

 		$scope.minDate =  new Date();

 		$scope.today();
 		$scope.popup1 = {
    		opened: false
 		};
 		$scope.popup2 = {
    		opened: false
 		};

 		$scope.setDate = function(year, month, day) {
    		$scope.dt1 = new Date(year, month, day);
  		};
 		$scope.setDate = function(year, month, day) {
    		$scope.dt2 = new Date(year, month, day);
  		};

  		$scope.dateOptions = {
    		formatYear: 'yy',
    		startingDay: 1
  		};
  		$scope.formats = ['yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
 		$scope.format = $scope.formats[0]; 		
 		$scope.altInputFormats = ['yyyy/MM/dd'];


		$scope.clear_add();
	}
];