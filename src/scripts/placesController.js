module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/mesto").then(function(response) {
        	$scope.places = response.data;
    	});

	}
];