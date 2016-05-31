module.exports = [
	'$http', '$window', '$q',
	function preduzecaService($http, $window, $q){

		function get_all_companies()
		{
			var resUrl = "http://localhost:61769/api/preduzece";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function get_filtered_companies(filter_params)
		{
			var resUrl = "http://localhost:61769/api/preduzece" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function create_company(id, name, mbr, pib, address, place)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/preduzece",
                    data: {
						Id_Preduzece: id, 
						Id: place,
						Naziv_Preduzece: name,
						Maticni_broj_Preduzece: mbr,
						PIB_Preduzece: pib,
						Adresa_Preduzece: address
					}
           }).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. PIB i matični broj moraju biti jedinstveni.");
			});
		}

		function remove_company(companyId)
		{
			var urlDelete = "http://localhost:61769/api/preduzece/"+companyId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	}).error(function(response, data){
				alert("Neuspešno brisanje. Prvo obrišite potomke.");
			});
		}


		function update_company(id, name, mbr, pib, address, place)
		{
			var url = "http://localhost:61769/api/preduzece/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Preduzece: id, 
						Id: place,
						Naziv_Preduzece: name,
						Maticni_broj_Preduzece: mbr,
						PIB_Preduzece: pib,
						Adresa_Preduzece: address
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. PIB i matični broj moraju biti jedinstveni.");
			});
		}

		function get_company_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/preduzece/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}

		return {
			get_all_companies: get_all_companies,
			get_filtered_companies: get_filtered_companies,
			create_company: create_company,
			remove_company: remove_company,
			update_company: update_company, 
			get_company_by_id: get_company_by_id,
		};

	}
];