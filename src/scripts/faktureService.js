module.exports = [
	'$http', '$window', '$q',
	function faktureService($http, $window, $q){

		function get_all_invoices()
		{
			var resUrl = "http://localhost:61769/api/faktura";
			return $http.get(resUrl).then(function(response) {
				return response.data;
			});
		}
		

		function create_invoice(invoiceId, invoiceNumber, invoiceYear, invoicePartner, invoiceDate, invoiceCurrency, invoiceRabat, invoiceIznosBezPdv, invoiceTotalPdv, invoiceTotalPlacanje)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/faktura",
                    data: {
						Id_Faktura: invoiceId,
						Broj_fakture_Faktura: invoiceNumber,
						Id_Poslovna_godina: invoiceYear,
						Id_Partner: invoicePartner,
						Datum_fakture_Faktura: invoiceDate,
						Datum_valute_Faktura: invoiceCurrency,
						Ukupan_rabat_Faktura: invoiceRabat,
						Ukupan_iznos_bez_PDV_a_Faktura: invoiceIznosBezPdv,
						Ukupan_PDV_Faktura: invoiceTotalPdv,
						Ukupno_za_placanje_Faktura: invoiceTotalPlacanje
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Broj fakture u okviru poslovne godine mora biti jedinstven.");
			});
		}

		function remove_invoice(invoiceId)
		{
			var urlDelete = "http://localhost:61769/api/faktura/"+invoiceId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
			});
		}

		function update_invoice(invoiceId, invoiceNumber, invoiceYear, invoicePartner, invoiceDate, invoiceCurrency, invoiceRabat, invoiceIznosBezPdv, invoiceTotalPdv, invoiceTotalPlacanje)
		{
			var url = "http://localhost:61769/api/faktura/"+invoiceId+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
						Id_Faktura: invoiceId,
						Broj_fakture_Faktura: invoiceNumber,
						Id_Poslovna_godina: invoiceYear,
						Id_Partner: invoicePartner,
						Datum_fakture_Faktura: invoiceDate,
						Datum_valute_Faktura: invoiceCurrency,
						Ukupan_rabat_Faktura: invoiceRabat,
						Ukupan_iznos_bez_PDV_a_Faktura: invoiceIznosBezPdv,
						Ukupan_PDV_Faktura: invoiceTotalPdv,
						Ukupno_za_placanje_Faktura: invoiceTotalPlacanje
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Broj fakture u okviru poslovne godine mora biti jedinstven.");
			});
		}


		function get_invoice_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/faktura/"+id+"/";
			return $http.get(resUrl).then(function(response) {
				return response.data;
			});	
		}

		function get_filtered_invoices(filter_params)
		{
			var resUrl = "http://localhost:61769/api/faktura" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		return {
			get_all_invoices: get_all_invoices,
			create_invoice: create_invoice,
			remove_invoice: remove_invoice,
			update_invoice: update_invoice, 
			get_filtered_invoices: get_filtered_invoices,
			get_invoice_by_id: get_invoice_by_id
		};

	}
];