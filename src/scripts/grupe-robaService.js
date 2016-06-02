module.exports = [
	'$http', '$window', '$q',
	function grupeRobaService($http, $window, $q){

		function get_all_groups() {
			var resUrl = "http://localhost:61769/api/grupa_roba";
			return $http.get(resUrl).then(function(response) {
				return response.data;
			});
		}

		function create_group(grupaId, grupaNaziv, grupaPdv, grupaPreduzece) {	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/grupa_roba",
                    data: {
						Id_Grupa_roba: grupaId, 
						Naziv_Grupa_roba: grupaNaziv,
						Id_PDV: grupaPdv,
						Id_Preduzece: grupaPreduzece
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv grupe mora biti jedinstven u okviru preduzeća.");
			});
		}

		function remove_group(grupaId)
		{
			var urlDelete = "http://localhost:61769/api/grupa_roba/"+grupaId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	}).error(function(response, data){
				alert("Neuspešno brisanje. Prvo obrišite potomke.");
			});
		}

		function update_group(grupaId, grupaNaziv, grupaPdv, grupaPreduzece)
		{	
			var url = "http://localhost:61769/api/grupa_roba/"+grupaId+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
						Id_Grupa_roba: grupaId, 
						Naziv_Grupa_roba: grupaNaziv,
						Id_PDV: grupaPdv,
						Id_Preduzece: grupaPreduzece
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv grupe mora biti jedinstven u okviru preduzeća.");
			});
		}


		function get_wareGroup_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/grupa_roba/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}

		return {
			get_all_groups: get_all_groups, 
			create_group: create_group, 
			update_group: update_group, 
			remove_group: remove_group,
			get_wareGroup_by_id: get_wareGroup_by_id,
		};

	}
];