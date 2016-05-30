module.exports = [
	'$http', '$window', '$q',
	function poslovneGodineService($http, $window, $q){

		function get_all_businessYears()
		{
			var resUrl = "http://localhost:61769/api/poslovna_godina";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_businessYear(id, godina, zakljucena, preduzece)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/poslovna_godina",
                    data: {
						Id_Poslovna_godina: id, 
						Id_Preduzece: preduzece,
						Godina_Poslovna_godina: godina,
						Zakljucena_Poslovna_godina: zakljucena
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Poslovna godina u okviru preduzeća već postoji.");
			});
		}

		function remove_businessYear(id)
		{
			var urlDelete = "http://localhost:61769/api/poslovna_godina/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_businessYear(id, godina, zakljucena, preduzece)
		{	
			var url = "http://localhost:61769/api/poslovna_godina/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Poslovna_godina: id, 
						Id_Preduzece: preduzece,
						Godina_Poslovna_godina: godina,
						Zakljucena_Poslovna_godina: zakljucena
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka. Poslovna godina u okviru preduzeća već postoji.");
			});
		}

		function get_businessYear_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/poslovna_godina/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}


		return {
			get_all_businessYears: get_all_businessYears, 
			create_businessYear: create_businessYear, 
			update_businessYear: update_businessYear, 
			remove_businessYear: remove_businessYear,
			get_businessYear_by_id: get_businessYear_by_id,
		};


	}
];