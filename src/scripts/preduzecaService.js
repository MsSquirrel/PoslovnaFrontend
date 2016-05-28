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
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_company(companyId)
		{
			var urlDelete = "http://localhost:61769/api/preduzece/"+companyId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
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
           	}).then(function(response){
				return response.data;				
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
			create_company: create_company,
			remove_company: remove_company,
			update_company: update_company, 
			get_company_by_id: get_company_by_id,
		};

	}
];