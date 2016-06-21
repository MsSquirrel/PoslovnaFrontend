'use strict'

module.exports = [
	'$http', '$location', '$rootScope', 'loginService', '$localStorage',
	function setBusinessYear($http, $location, $rootScope, loginService, $localStorage){

		$rootScope.setBusinessYear = function(businessYear)
		{
			console.log("Set business year function...");
			console.log("Current state..."+$rootScope.currentState);
			$rootScope.businessYear = businessYear;
			console.log("You want to set business year to: "+$rootScope.businessYear);


			$rootScope.currentFunction();

		}

	}
];