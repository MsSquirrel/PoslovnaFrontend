module.exports = [
	'$http', '$window', '$q',
	function merneJediniceService($http, $window, $q){


		function get_all_measUnits()
		{
			var resUrl = "http://localhost:61769/api/Jedinica_mere";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}



		function get_filtered_measUnits(filter_params)
		{
			var resUrl = "http://localhost:61769/api/Jedinica_mere" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}



		function add_measUnit(id, name, oznaka)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/Jedinica_mere",
                    data: {
						Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name,
						Oznaka_Jedinica_mere: oznaka
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv i oznaka jedinice mere moraju biti jedinstveni.");
			});
		}

		function remove_measUnit(id)
		{
			var urlDelete = "http://localhost:61769/api/Jedinica_mere/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	}).error(function(response, data){
				alert("Neuspešno brisanje. Prvo obrišite potomke.");
			});
		}


		function update_measUnit(id, name, oznaka)
		{
			var url = "http://localhost:61769/api/Jedinica_mere/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name, 
						Oznaka_Jedinica_mere: oznaka,
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv i oznaka jedinice mere moraju biti jedinstveni.");
			});
		}


		function get_measUnit_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/Jedinica_mere/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}

		return {
			get_all_measUnits: get_all_measUnits,
			get_filtered_measUnits: get_filtered_measUnits,
			add_measUnit: add_measUnit,
			remove_measUnit: remove_measUnit,
			update_measUnit: update_measUnit,
			get_measUnit_by_id: get_measUnit_by_id,
		};

	}
];