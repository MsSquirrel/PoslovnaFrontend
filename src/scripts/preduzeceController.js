module.exports = [
	'$scope', '$http', 'preduzecaService','mestaService', '$routeParams','$window',
	function myController($scope, $http, preduzecaService, mestaService, $routeParams, $window){

		$scope.companyId =-1;
		$scope.companyName ="";
		$scope.companyMBR = "";
		$scope.companyPIB = "";
		$scope.companyAddress="";
		$scope.companyPlace= "";
		$scope.allPlaces = {};



		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 			
 		 $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Preduzece', width:'25%', displayName: 'Naziv'},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Maticni broj'},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB'},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa'},
		    { name:'Mesto.Naziv_Mesto', width:'25%', displayName: 'Mesto' }
		  ];

    	function fillData(){
    		preduzecaService.get_all_companies()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		}

		fillData();

		$scope.add_company = function()
		{
			//console.log("Uneto "+$scope.companyId+", "+$scope.companyName+", "+$scope.companyMBR+", "+$scope.companyPIB);
			//console.log("Adresa i mesto "+$scope.companyAddress+", "+$scope.companyPlace);

			console.log("Odabrano mesto sa id "+$scope.check);
			preduzecaService.create_company($scope.companyId, $scope.companyName, $scope.companyMBR, $scope.companyPIB, $scope.companyAddress, $scope.check).then(function(response){
				$window.location.reload();
			});


		};

		$scope.check = "";

		$scope.chose_place = function()
		{	
		};



	}
];