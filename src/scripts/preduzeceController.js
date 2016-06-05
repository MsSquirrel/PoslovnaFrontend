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


      /*$http.get('http://localhost:61769/api/pdf', {responseType: 'arraybuffer'})
       .success(function (data) {
           var file = new Blob([data], {type: 'application/pdf'});
           var fileURL = URL.createObjectURL(file);
           window.open(fileURL);
    });*/

	}
];