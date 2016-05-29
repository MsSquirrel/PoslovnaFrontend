'use strict'

module.exports = [
	'$location', '$rootScope', 'loginService',
	function states($location, $rootScope, loginService){
		$rootScope.previousState;
		$rootScope.currentState;

		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    		$rootScope.previousState = from.name;
    		$rootScope.currentState = to.name;
    		//console.log('Previous state:'+$rootScope.previousState)
    	    //console.log('Current state:'+$rootScope.currentState)
    		

			if (!loginService.getCurrentUser() && window.location != "#/login"){
				window.location = "#/login";
			}

			if (loginService.getCurrentUser() && window.location.href.indexOf("#/login") != -1){
	            window.location.href = "#/main";
	        }

		});
		
			
	    
	}
];