module.exports = [
	'$http', '$window', '$q',
	function stopePDVService($http, $window, $q){

		function get_all_PDVRates()
		{
			var resUrl = "http://localhost:61769/api/stopa_pdva";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_pdvRate(id, rate, date, pdvId)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/stopa_pdva",
                    data: {
						Id_Stopa_PDV_a: id, 
						Id_PDV: pdvId,
						Stopa_Stopa_PDV_a: rate,
						Datum_vazenja_Stopa_PDV_a: date
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_pdvRate(id)
		{
			var urlDelete = "http://localhost:61769/api/stopa_pdva/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_pdvRate(id, rate, date, pdvId)
		{
			var url = "http://localhost:61769/api/stopa_pdva/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Stopa_PDV_a: id, 
						Id_PDV: pdvId,
						Stopa_Stopa_PDV_a: rate,
						Datum_vazenja_Stopa_PDV_a: date
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function get_pdvRate_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/stopa_pdva/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}

		return {
			get_all_PDVRates: get_all_PDVRates,
			create_pdvRate: create_pdvRate, 
			remove_pdvRate: remove_pdvRate,
			update_pdvRate: update_pdvRate,
			get_pdvRate_by_id: get_pdvRate_by_id,
		};

	}
];