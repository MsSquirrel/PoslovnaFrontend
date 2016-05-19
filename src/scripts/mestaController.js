module.exports = [
	'$scope', '$http', 'mestaService', '$routeParams','$window',
	function myController($scope, $http, mestaService,$routeParams, $window){

		$scope.placeId = -1;
		$scope.placeName = "";
		$scope.placeNumber = "00000";
		$scope.placeUrl = "";

		
		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };

		  $scope.gridOptions.columnDefs = [
		    { name:'Id', width:'20%', displayName:'Id'},
		    { name:'Naziv_Mesto', width:'50%', displayName: 'Naziv'},
		    { name:'Postansk__broj_Mesto', width:'30%', displayName: 'Poštanski broj'}, 
		  ];

		 function fillData(){
    		mestaService.get_all_places()
				.then(function(response){
				$scope.gridOptions.data = response;
			});
		}

		fillData();


		$scope.add_place = function()
		{
			console.log("Add place "+$scope.placeId + ", "+$scope.placeName+ ", "+$scope.placeNumber);
			mestaService.create_place($scope.placeId, $scope.placeName, $scope.placeNumber).then(function(response){
				//$scope.reservationUrl = response.url;
				//$window.location ="#/mesta";
				console.log("Refreshovati stranicu da se izmene vide odmah. Iz nekog razloga ne radi komentarisani kod..");
			});
		}





	}
];