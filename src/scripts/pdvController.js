module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/pdv").then(function(response) {
        	$scope.data = response.data;
    	});

	}
];