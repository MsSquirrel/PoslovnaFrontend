module.exports = [
	'$http', '$window', '$q',
	function analitikaService($http, $window, $q){

		function get_filtered_analitika(filter_params)
		{
			var resUrl = "http://localhost:61769/api/analitika_magacinske_kartice" + filter_params;
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		return{
			get_filtered_analitika: get_filtered_analitika,	
		};

	}
];