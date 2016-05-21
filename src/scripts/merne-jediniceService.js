module.exports = [
	'$http', '$window', '$q',
	function merneJediniceService($http, $window, $q){


		function get_all_measUnits()
		{
			var resUrl = "http://localhost:61769/api/jedinica_mere";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}


		function add_measUnit(id, name)
		{	
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/jedinica_mere",
                    data: {
						Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_measUnit(id)
		{
			var urlDelete = "http://localhost:61769/api/jedinica_mere/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_measUnit(id, name)
		{
			var url = "http://localhost:61769/api/jedinica_mere/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Jedinica_mere: id, 
						Naziv_Jedinica_mere: name,
					}
           	}).then(function(response){
				return response.data;				
			});
		}


		return {
			get_all_measUnits: get_all_measUnits,
			add_measUnit: add_measUnit,
			remove_measUnit: remove_measUnit,
			update_measUnit: update_measUnit,
		};

	}
];