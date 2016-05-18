module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/analitika_magacinske_kartice").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];