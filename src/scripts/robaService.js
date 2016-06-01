module.exports = [
	'$http', '$window', '$q',
	function robaService($http, $window, $q) {		
		
		function get_all_goods()
		{
			var resUrl = "http://localhost:61769/api/roba";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function get_filtered_goods(filter_params)
		{
			var resUrl = "http://localhost:61769/api/roba" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_goods(id, naziv, kategorija, mernaJedinica, preduzece)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/roba",
                    data: {
						Id_Roba: id, 
						Naziv_Roba: naziv,
						Id_Grupa_roba: kategorija,
						Id_Jedinica_mere: mernaJedinica,
						Id_Preduzece: preduzece
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Roba u jedinici mere mora biti jedinstvena.");
			});
		}

		function remove_goods(id)
		{
			var urlDelete = "http://localhost:61769/api/roba/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           }).error(function(response, data){
				alert("Neuspešno brisanje. Prvo obrišite potomke.");
			});
		}

		function update_goods(id, naziv, kategorija, mernaJedinica, preduzece)
		{	
			var url = "http://localhost:61769/api/roba/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
						Id_Roba: id, 
						Naziv_Roba: naziv,
						Id_Grupa_roba: kategorija,
						Id_Jedinica_mere: mernaJedinica,
						Id_Preduzece: preduzece
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Roba u jedinici mere mora biti jedinstvena.");
			});
		}


		return {
			get_all_goods: get_all_goods,
			get_filtered_goods: get_filtered_goods, 
			create_goods: create_goods, 
			update_goods: update_goods, 
			remove_goods: remove_goods,
		};		
	}
];