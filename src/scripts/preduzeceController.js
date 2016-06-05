module.exports = [
	'$scope', '$http', 'preduzecaService',
	function myController($scope, $http, preduzecaService){

		/*$preduzece.naziv = "";
      $preduzece.PIB = "";
      $preduzece.maticniBroj = "";
      $preduzece.adresa = "";
      $preduzece.mesto = "";*/

      preduzecaService.get_all_companies()
         .then(function(response){
            $scope.preduzece = response[0];
      });


      

	}
];