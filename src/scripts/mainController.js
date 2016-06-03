module.exports = [
	'$scope', '$http', '$localStorage', 'loginService', '$rootScope',
	function myController($scope, $http, $localStorage, loginService, $rootScope){
		
		$scope.currentUser  = $localStorage.currentUser;

		if (!$scope.currentUser && window.location != "#/login" && window.location != "#/register"){
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