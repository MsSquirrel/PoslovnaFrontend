module.exports = [
	'$scope', '$http', '$localStorage', 'loginService', '$rootScope', 'poslovneGodineService',
	function myController($scope, $http, $localStorage, loginService, $rootScope, poslovneGodineService){
		
		$scope.currentUser  = $localStorage.currentUser;
		$scope.activeBusinessYears = "";

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

        $scope.getAllBusinessYears = function()
        {
        	console.log("Sve aktivne poslovne godine: ");
        	poslovneGodineService.get_active_businessYears().then(function(response){
        		console.log("Response: "+response[0].Godina_Poslovna_godina);
        		$scope.activeBusinessYears = response;
        	});
        };

        $scope.getAllBusinessYears();

	}
];