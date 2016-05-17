module.exports = [
	'$scope', '$http',
	function myController($scope, $http){
		
		$http.get("http://localhost:61769/api/preduzece").then(function(response) {
        	$scope.preduzeca = response.data;
    	});

	}
];