module.exports = [
	'$http', '$window', '$q',
	function mestaService($http, $window, $q){

		function get_all_places()
		{
			var resUrl = "http://localhost:61769/api/mesto";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function get_place(placeId)
		{
			return "TODO TODO TODO TODO TODOOOOO";
		}

		function create_place(placeId, placeName, placeNumber)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/mesto",
                    data: {
						Id: placeId, 
						Naziv_Mesto: placeName,
						Postansk__broj_Mesto: placeNumber
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_place(placeId)
		{
			var urlDelete = "http://localhost:61769/api/mesto/"+placeId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_place(placeId, placeName, placeNumber)
		{
			var url = "http://localhost:61769/api/mesto/"+placeId+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id: placeId, 
						Naziv_Mesto: placeName,
						Postansk__broj_Mesto: placeNumber
					}
           	}).then(function(response){
				return response.data;				
			});
		}



		return {
			get_all_places: get_all_places,
			get_place: get_place,
			create_place: create_place,
			remove_place: remove_place,
			update_place: update_place,
		};


	}
];