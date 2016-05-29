module.exports = [
	'$scope', '$http', '$localStorage', 'loginService',
	function myController($scope, $http, $localStorage, loginService){
		
		$scope.currentUser  = $localStorage.currentUser;

		if (!$scope.currentUser && window.location != "#/login"){
			window.location = "#/login";
		}

        $scope.logout=function () {
            loginService.logout();
            $scope.refreshUser();
        };

        $scope.refreshUser = function() {
            $scope.currentUser  = $localStorage.currentUser;
        }

	}
];