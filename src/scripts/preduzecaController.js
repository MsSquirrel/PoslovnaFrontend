module.exports = [
	'$scope', '$http', 'preduzecaService','mestaService', '$routeParams','$window', '$state','$rootScope','$location', '$stateParams',
	function myController($scope, $http, preduzecaService, mestaService, $routeParams, $window, $state, $rootScope, $location, $stateParams){

		$scope.allPlaces = {};

		$scope.selectedRow =  {};
   		$scope.selectedCompanyId = -1;
   		$scope.selectedCompanyName = "";
   		$scope.selectedCompanyMBR = "";
   		$scope.selectedCompanyPIB = "";
   		$scope.selectedCompanyAddress ="";
   		$scope.selectedCompanyPlace ="";

   		$scope.editCompanyName = "";
   		$scope.editCompanyMBR = "";
   		$scope.editCompanyPIB = "";
   		$scope.editCompanyAddress ="";
   		$scope.editCompanyPlace = "";

   		$scope.newPlaceName = "";
   		$scope.newPlaceNumber = "00000";
   		$scope.newPlaceId = -1;


   		$scope.isModal = $state.current.data.isModal;
   		console.log("Comapany is modal: "+$scope.isModal);


   		$scope.gridOptions = {
   		   enableRowSelection: true,
   		    enableSelectAll: false,
       		selectionRowHeaderWidth: 0,
       		multiSelect: false,
       		enableFullRowSelection: true
   		};
 			
 		$scope.gridOptions.columnDefs = [
		    { name:'Naziv_Preduzece', width:'25%', displayName: 'Naziv', cellTooltip: true, headerTooltip: true},
		    { name:'Maticni_broj_Preduzece', width:'15%', displayName: 'Matični broj', cellTooltip: true, headerTooltip: true},
		    { name:'PIB_Preduzece', width:'15%', displayName: 'PIB', cellTooltip: true, headerTooltip: true},
		    { name:'Adresa_Preduzece', width:'20%', displayName: 'Adresa', cellTooltip: true, headerTooltip: true},
		    { name:'Mesto.Naziv_Mesto', width:'25%', displayName: 'Mesto' , cellTooltip: true, headerTooltip: true}
		];


		$scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				setSelection();
		  	});
   		};


   		function setSelection()
   		{
   			$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];

   			$scope.selectedCompanyId = $scope.selectedRow.Id_Preduzece;
   			$scope.selectedCompanyName = $scope.selectedRow.Naziv_Preduzece;
   			$scope.selectedCompanyMBR = $scope.selectedRow.Maticni_broj_Preduzece;
   			$scope.selectedCompanyPIB = $scope.selectedRow.PIB_Preduzece;
   			$scope.selectedCompanyAddress = $scope.selectedRow.Adresa_Preduzece;
   			$scope.selectedCompanyPlace = $scope.selectedRow.Mesto.Id;

   			$scope.editCompanyName = $scope.selectedRow.Naziv_Preduzece;
   			$scope.editCompanyMBR = $scope.selectedRow.Maticni_broj_Preduzece;
   			$scope.editCompanyPIB = $scope.selectedRow.PIB_Preduzece;
   			$scope.editCompanyAddress = $scope.selectedRow.Adresa_Preduzece;
   			$scope.editCompanyPlace = $scope.selectedRow.Mesto.Id;
   		};
		
      
      $scope.nextMeh = function()
      {
         var url_filter = "?$filter=";

         var mestoId = $stateParams.mestoId;
         console.log("PARAM: "+ mestoId);

         if(mestoId=='')
         {
            return;
         }

         if($scope.mestoId!='')
         {
            url_filter += "Id eq " + mestoId;
         }

         console.log(url_filter);
         preduzecaService.get_filtered_companies(url_filter).then(function(response){
               $scope.gridOptions.data = response;
         });

      };


    	function fillData(){

         if($stateParams.mestoId=='' || $stateParams.mestoId==undefined){
       		preduzecaService.get_all_companies()
   				.then(function(response){
   				$scope.gridOptions.data = response;
   			});
         }
         else
         {
          $scope.nextMeh();
         }

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		};		 

		fillData();

		$scope.clear_add = function(){
			$scope.companyName ="";
			$scope.companyMBR = "";
			$scope.companyPIB = "";
			$scope.companyAddress="";
			$scope.companyPlace= "";
			$scope.check = "";
			$scope.changePlace = "";
			if($scope.isModal)
			{
				$scope.$close(true);
			}
	    };


	    $scope.closeState = function()
	    {
	      $scope.clear_add();
	  	  $state.go('^',{}, {reload:true});
	    }

		$scope.add_company = function()
		{
			preduzecaService.create_company($scope.companyId, $scope.companyName, $scope.companyMBR, $scope.companyPIB, $scope.companyAddress, $scope.check).then(function(response){
				$scope.clear_add();	
				$state.go('^',{}, {reload:true});
			});
		};

	
		$scope.remove_selected_company = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			console.log("ID preduzeca je "+$scope.selectedRow[0].Id_Preduzece);
			preduzecaService.remove_company($scope.selectedRow[0].Id_Preduzece).then(function(response){
				fillData();
				 
			});
		};


		$scope.edit_selected_company = function(id, name, mbr, pib, address, place)
		{
			console.log("Promenjeno: "+id+", "+name+", "+mbr+", "+pib+", "+address+", "+place);
			preduzecaService.update_company(id, name, mbr, pib, address, place).then(function(response){
				$state.go('^',{}, {reload:true});
			});
		};

	}
];