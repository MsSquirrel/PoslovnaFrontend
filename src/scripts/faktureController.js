module.exports = [
	'$scope', '$http', 'faktureService', 'poslovneGodineService', 'partneriService', '$routeParams', '$window',
	function myController($scope, $http, faktureService, poslovneGodineService, partneriService, $routeParams, $window){
		
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
		$scope.selectedInvoiceNumber = "";
		$scope.selectedInvoiceYear = "";
		$scope.selectedInvoicePartner = "";
		$scope.selectedInvoiceDate = "";
		$scope.selectedInvoiceCurrency = "";
		$scope.selectedInvoiceRabat = "";
		$scope.selectedInvoiceIznosBezPdv = "";
		$scope.selectedInvoiceTotalPdv = "";
		$scope.selectedInvoiceTotalPlacanje = "";

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
				$scope.selectedInvoiceDate = $scope.selectedRow.Datum_fakture_Faktura;
				$scope.selectedInvoiceCurrency = $scope.selectedRow.Datum_valute_Faktura;
				$scope.selectedInvoiceRabat = $scope.selectedRow.Ukupan_rabat_Faktura;
				$scope.selectedInvoiceIznosBezPdv = $scope.selectedRow.Ukupan_iznos_bez_PDV_a_Faktura;
				$scope.selectedInvoiceTotalPdv = $scope.selectedRow.Ukupan_PDV_Faktura;
				$scope.selectedInvoiceTotalPlacanje = $scope.selectedRow.Ukupno_za_placanje_Faktura;

				$scope.editInvoiceNumber = $scope.selectedRow.Broj_fakture_Faktura;
				$scope.editInvoiceYear = $scope.selectedRow.Poslovna_godina.Id_Poslovna_godina;
				$scope.editInvoicePartner = $scope.selectedRow.Poslovni_partner.Id_Partner;
				$scope.editInvoiceDate = $scope.selectedRow.Datum_fakture_Faktura;
				$scope.editInvoiceCurrency = $scope.selectedRow.Datum_valute_Faktura;
				$scope.editInvoiceRabat = $scope.selectedRow.Ukupan_rabat_Faktura;
				$scope.editInvoiceIznosBezPdv = $scope.selectedRow.Ukupan_iznos_bez_PDV_a_Faktura;
				$scope.editInvoiceTotalPdv = $scope.selectedRow.Ukupan_PDV_Faktura;
				$scope.editInvoiceTotalPlacanje = $scope.selectedRow.Ukupno_za_placanje_Faktura;
		  });
   		};

    	function fillData(){
    		faktureService.get_all_invoices().then(function(response){
				$scope.gridOptions.data = response;
			});

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
			$scope.invoiceDate = "";
			$scope.invoiceCurrency = "";
			$scope.invoiceRabat = "";
			$scope.invoiceIznosBezPdv = "";
			$scope.invoiceTotalPdv = "";
			$scope.invoiceTotalPlacanje = "";
		}

		$scope.clear_add();

		$scope.add_invoice = function()
		{
			console.log("Unesi: "+$scope.invoiceId+", "+$scope.invoiceNumber+", "+$scope.invoiceYear+", "+$scope.invoicePartner+", "+$scope.invoiceDate+", "+$scope.invoiceCurrency+", "+$scope.invoiceRabat+", "+$scope.invoiceIznosBezPdv+", "+$scope.invoiceTotalPdv+", "+$scope.invoiceTotalPlacanje);
			faktureService.create_invoice($scope.invoiceId, $scope.invoiceNumber, $scope.invoiceYear, $scope.invoicePartner, $scope.invoiceDate, $scope.invoiceCurrency, $scope.invoiceRabat, $scope.invoiceIznosBezPdv, $scope.invoiceTotalPdv, $scope.invoiceTotalPlacanje).then(function(response){
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
			console.log("Promenjena: "+$scope.selectedInvoiceId+", "+$scope.editInvoiceNumber+", "+$scope.editInvoiceYear+", "+$scope.editInvoicePartner+", "+$scope.editInvoiceDate+", "+$scope.editInvoiceCurrency+", "+$scope.editInvoiceRabat+", "+$scope.editInvoiceIznosBezPdv+", "+$scope.editInvoiceTotalPdv+", "+$scope.editInvoiceTotalPlacanje);
			faktureService.update_invoice($scope.selectedInvoiceId, $scope.editInvoiceNumber, $scope.editInvoiceYear, $scope.editInvoicePartner, $scope.editInvoiceDate, $scope.editInvoiceCurrency, $scope.editInvoiceRabat, $scope.editInvoiceIznosBezPdv, $scope.editInvoiceTotalPdv, $scope.editInvoiceTotalPlacanje).then(function(response){
				fillData();
			});
		};
	}
];