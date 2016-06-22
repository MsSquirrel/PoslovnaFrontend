module.exports = [
	'$http', '$window', '$q',
	function prijemniDokumentiService($http, $window, $q){

		function get_filtered_robnaKartica(filter_params)
		{
			var resUrl = "http://localhost:61769/api/robna_kartica" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function get_all_robnaKartica()
		{
			var resUrl = "http://localhost:61769/api/robna_kartica";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		return{
			get_filtered_robnaKartica: get_filtered_robnaKartica,
			get_all_robnaKartica: get_all_robnaKartica, 	
		};

	}
];