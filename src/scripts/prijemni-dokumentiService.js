module.exports = [
	'$http', '$window', '$q',
	function prijemniDokumentiService($http, $window, $q){

		function get_all_warehouseReceipts()
		{

			var resUrl = "http://localhost:61769/api/prijemni_dokument";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function get_unrecorded_warehouseReceipts()
		{

			var resUrl = "http://localhost:61769/api/prijemni_dokument?$filter=Status_Prijemni_dokument eq 'F'";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_warehouseReceipt(godina, mag1, mag2, partner, zTroskovi, tTroskovi, datum)
		{	

			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/prijemni_dokument",
                    data: {
						Id_Poslovna_godina: godina, 
						Id_Magacin: mag1,
						Mag_Id_Magacin: mag2,
						Id_Partner: partner,
						Zavisni_troskovi_Prijemni_dokument: zTroskovi,
						Transportni_troskovi_Prijemni_dokument: tTroskovi,
						Datum_formiranja_Prijemni_dokument: datum
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka.");
			});
		}

		function remove_warehouseReceipt(id)
		{
			var urlDelete = "http://localhost:61769/api/prijemni_dokument/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	}).error(function(response, data){
				alert("Neuspešno brisanje. Prvo obrišite potomke.");
			});
		}

		function update_warehouseReceipt(id, godina, mag1, mag2, partner, zTroskovi, tTroskovi, datum)
		{	
			var url = "http://localhost:61769/api/prijemni_dokument/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Prijemni_dokument: id,
                    	Id_Poslovna_godina: godina, 
						Id_Magacin: mag1,
						Mag_Id_Magacin: mag2,
						Id_Partner: partner,
						Zavisni_troskovi_Prijemni_dokument: zTroskovi,
						Transportni_troskovi_Prijemni_dokument: tTroskovi,
						Datum_formiranja_Prijemni_dokument: datum
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka.");
			});
		}

		function get_warehouseReceipt_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/prijemni_dokument/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}

		function calculate(id){
			var resUrl = "http://localhost:61769/api/calculate/"+id+"/";
			return $http.post(resUrl)
				.success(function(response) {
					return response.data;
				}).error(function(response){
					alert("Došlo je do greške.");
				});
				
		}

		function record(id){
			var resUrl = "http://localhost:61769/api/record/"+id+"/";
			return $http.post(resUrl)
				.success(function(response) {
					return response.data;
				}).error(function(response){
					alert("Došlo je do greške.");
				});
		}

		function cancel(id){
			var resUrl = "http://localhost:61769/api/cancel/"+id+"/";
			return $http.post(resUrl)
				.success(function(response) {
					return response.data;
				}).error(function(response){
					alert("Došlo je do greške.");
				});
		}

		function get_filtered_warehouseReceipts(filter_params)
		{
			var resUrl = "http://localhost:61769/api/prijemni_dokument" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		return {
			get_all_warehouseReceipts: get_all_warehouseReceipts,
			get_unrecorded_warehouseReceipts: get_unrecorded_warehouseReceipts, 
			create_warehouseReceipt: create_warehouseReceipt, 
			update_warehouseReceipt: update_warehouseReceipt, 
			remove_warehouseReceipt: remove_warehouseReceipt,
			get_warehouseReceipt_by_id: get_warehouseReceipt_by_id,
			calculate: calculate,
			record: record,
			cancel: cancel,
			get_filtered_warehouseReceipts: get_filtered_warehouseReceipts,
		};


	}
];