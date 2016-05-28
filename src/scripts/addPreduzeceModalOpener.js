module.exports = [
'$stateParams', '$state', '$uibModal', 
function($stateParams, $state, $uibModal) {
          console.log('hello world!');
          
          $uibModal.open({
            templateUrl: "./templates/createPlace.html",
            controller: 'mestaCtrl'
        }).result.finally(function() {
            $state.go('^');
        });
}];