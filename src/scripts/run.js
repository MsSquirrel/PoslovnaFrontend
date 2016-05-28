'use strict'

module.exports = [
	'$location', '$rootScope',
	function states($location, $rootScope){
		$rootScope.previousState;
		$rootScope.currentState;
		$rootScope.$on('$stateChangeSuccess', function(ev, to, toParams, from, fromParams) {
    		$rootScope.previousState = from.name;
    		$rootScope.currentState = to.name;
    		//console.log('Previous state:'+$rootScope.previousState)
    		//console.log('Current state:'+$rootScope.currentState)
		});
	}
];