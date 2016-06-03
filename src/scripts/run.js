'use strict'

module.exports = [
	'$http', '$location', '$rootScope', 'loginService', '$localStorage',
	function states($http, $location, $rootScope, loginService, $localStorage){
		$rootScope.previousState;
		$rootScope.currentState;

		if ($localStorage.currentUser) {
            $http.defaults.headers.common.Authorization = $localStorage.currentUser.token;
        }

		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    		$rootScope.previousState = from.name;
    		$rootScope.currentState = to.name;
    		//console.log('Previous state:'+$rootScope.previousState)
    	    //console.log('Current state:'+$rootScope.currentState)
    		

			if (!loginService.getCurrentUser() && $rootScope.currentState != "login" && $rootScope.currentState != "register"){
				window.location = "#/login";
			}

			if (loginService.getCurrentUser() && (window.location.href.indexOf("#/login") != -1 || window.location.href.indexOf("#/register") != -1)){
	            window.location.href = "#/main";
	        }

		});
		
			
	    
	}
];