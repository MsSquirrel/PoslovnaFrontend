module.exports = [
	'$http', '$window', '$q',
	function pdvService($http, $window, $q){

		function get_all_pdvs()
		{
			var resUrl = "http://localhost:61769/api/PDV";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function create_pdv(id, name)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/PDV",
                    data: {
						Id_PDV: id, 
						Naziv_PDV: name,
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv PDV-a mora biti jedinstven.");
			});
		}


		function remove_pdv(id)
		{
			var urlDelete = "http://localhost:61769/api/PDV/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_pdv(id, name)
		{
			var url = "http://localhost:61769/api/PDV/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_PDV: id, 
						Naziv_PDV: name,
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Naziv PDV-a mora biti jedinstven.");
			});
		};

		function get_pdv_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/PDV/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		};




		return {
			get_all_pdvs: get_all_pdvs,
			remove_pdv: remove_pdv, 
			create_pdv: create_pdv,
			update_pdv: update_pdv,
			get_pdv_by_id: get_pdv_by_id,
		};
	}

];