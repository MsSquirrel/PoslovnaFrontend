module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/poslovna_godina").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];