module.exports = [
	'$scope', '$http', '$localStorage', 'loginService',
	function myController($scope, $http, $localStorage, loginService){

		$scope.test = function(){
			alert("radi");
		}

		$scope.currentUser  = $localStorage.currentUser;

        $scope.logout=function () {
            loginService.logout();
            $scope.refreshUser();
        };

        $scope.refreshUser = function() {
            $scope.currentUser  = $localStorage.currentUser;
        }

	}
];