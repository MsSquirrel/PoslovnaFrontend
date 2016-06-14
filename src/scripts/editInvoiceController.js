module.exports = [
	'$scope', '$http', 'faktureService', 'poslovneGodineService', 'partneriService','$stateParams','$window', '$state', '$rootScope',
	function myController($scope, $http, faktureService, poslovneGodineService, partneriService, $stateParams, $window, $state, $rootScope){

		$scope.invoiceId = $stateParams.id;

		function fillData() {
			faktureService.get_invoice_by_id($scope.invoiceId).then(function(response){
				$scope.invoice = response;
				$scope.editInvoiceNumber = $scope.invoice.Broj_fakture_Faktura;
				$scope.editInvoiceYear = $scope.invoice.Id_Poslovna_godina;
				$scope.editInvoicePartner = $scope.invoice.Id_Partner;
				$scope.editDt1 = $scope.invoice.Datum_fakture_Faktura
				$scope.editDt2 = $scope.invoice.Datum_valute_Faktura;
				$scope.editInvoiceRabat = $scope.invoice.Ukupan_rabat_Faktura;
				$scope.editInvoiceIznosBezPdv = $scope.invoice.Ukupan_iznos_bez_PDV_a_Faktura;
				$scope.editInvoiceTotalPdv = $scope.invoice.Ukupan_PDV_Faktura;
				$scope.editInvoiceTotalPlacanje = $scope.invoice.Ukupno_za_placanje_Faktura;

				var niz1 = new Array();
				niz1 = $scope.editDt1.split('-');
				var date1 = niz1[2].split('T')[0];
				var month1 = niz1[1]-1;
				$scope.editDt1 = new Date(niz1[0], month1, date1);

				var niz2 = new Array();
				niz2 = $scope.editDt2.split('-');
				var date2 = niz2[2].split('T')[0];
				var month2 = niz2[1]-1;
				$scope.editDt2 = new Date(niz2[0], month2, date2);
			});

			poslovneGodineService.get_all_businessYears().then(function(response){
				$scope.allYears = response;
			});

			partneriService.get_all_partners().then(function(response){
				$scope.allPartners = response;
			});
		};

		fillData();

		$scope.edit_selected_pdv = function()
		{
			faktureService.update_invoice($scope.selectedInvoiceId, $scope.editInvoiceNumber, $scope.editInvoiceYear, $scope.editInvoicePartner, editInvoiceDate, editInvoiceCurrency, $scope.editInvoiceRabat, $scope.editInvoiceIznosBezPdv, $scope.editInvoiceTotalPdv, $scope.editInvoiceTotalPlacanje).then(function(response){
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

	}
];