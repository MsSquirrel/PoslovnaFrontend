module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/magacin").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];