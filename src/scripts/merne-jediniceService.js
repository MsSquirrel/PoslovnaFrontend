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
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_measUnit(id)
		{
			var urlDelete = "http://localhost:61769/api/Jedinica_mere/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
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
						Oznaka_Jedinica_mere: oznaka
					}
           	}).then(function(response){
				return response.data;				
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
			add_measUnit: add_measUnit,
			remove_measUnit: remove_measUnit,
			update_measUnit: update_measUnit,
			get_measUnit_by_id: get_measUnit_by_id,
		};

	}
];