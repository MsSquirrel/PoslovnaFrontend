module.exports = [
	'$scope', '$http', 'partneriService','preduzecaService', 'mestaService','$routeParams','$window', '$state',
	function myController($scope, $http, partneriService, preduzecaService, mestaService, $routeParams, $window, $state){

		$scope.allCompanies = {};
		$scope.allPlaces = {};

		$scope.typeOptions = ['Kupac', 'Dobavljac', 'Kupac i dobavljac'];

		$scope.selectedRow =  {};
   		$scope.selectedPartnerId = -1;
   		$scope.selectedPartnerName = "";
   		$scope.selectedPartnerMBR = "";
   		$scope.selectedPartnerPIB = "";
   		$scope.selectedPartnerAddress ="";
   		$scope.selectedPartnerPlace ="";
   		$scope.selectedPartnerType = "";
   		$scope.selectedPartnerCompany = "";
   	
   		$scope.editPartnerName = "";
   		$scope.editPartnerMBR = "";
   		$scope.editPartnerPIB = "";
   		$scope.editPartnerAddress ="";
   		$scope.editPartnerPlace ="";
   		$scope.editPartnerType = "";
   		$scope.editPartnerCompany = "";
   		$scope.editPartnerType = "";

		$scope.gridOptions = {
		    enableRowSelection: true,
		    enableSelectAll: false,
    		selectionRowHeaderWidth: 0,
    		multiSelect: false,
    		enableFullRowSelection: true
		  };
 

		 $scope.gridOptions.columnDefs = [
		    { name:'Naziv_Partner', width:'20%', displayName: 'Partner', cellTooltip: true, headerTooltip: true},
		    { name:'Tip_Partner', width:'13%', displayName: 'Tip partnera', cellTooltip: true, headerTooltip: true},
		    { name:'Maticni_broj_Partner', width:'13%', displayName: 'Matični broj', cellTooltip: true, headerTooltip: true},
		    { name:'PIB_Partner', width:'14%', displayName: 'PIB', cellTooltip: true, headerTooltip: true},
		    { name:'Adresa_Partner', width:'20%', displayName: 'Adresa', cellTooltip: true, headerTooltip: true},
		    { name:'Mesto.Naziv_Mesto', width:'20%', displayName: 'Mesto', cellTooltip: true, headerTooltip: true },
		  ];

		  $scope.gridOptions.onRegisterApi = function(gridApi) {
   			$scope.gridOptions = gridApi;

   			$scope.gridOptions.selection.on.rowSelectionChanged($scope,function(row){
   				$scope.selectedRow =  $scope.gridOptions.selection.getSelectedRows()[0];					 
				
   				$scope.selectedPartnerId = $scope.selectedRow.Id_Partner;
   				$scope.selectedPartnerName = $scope.selectedRow.Naziv_Partner;
   				$scope.selectedPartnerMBR = $scope.selectedRow.Maticni_broj_Partner;
   				$scope.selectedPartnerPIB = $scope.selectedRow.PIB_Partner;
   				$scope.selectedPartnerAddress = $scope.selectedRow.Adresa_Partner;
   				$scope.selectedPartnerPlace = $scope.selectedRow.Mesto.Id;
   				$scope.selectedPartnerCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
   				$scope.selectedPartnerType = $scope.selectedRow.Tip_Partner;

   				$scope.editPartnerName = $scope.selectedRow.Naziv_Partner;
   				$scope.editPartnerMBR = $scope.selectedRow.Maticni_broj_Partner;
   				$scope.editPartnerPIB = $scope.selectedRow.PIB_Partner;
   				$scope.editPartnerAddress = $scope.selectedRow.Adresa_Partner;
   				$scope.editPartnerPlace = $scope.selectedRow.Mesto.Id;
   				$scope.editPartnerCompany = $scope.selectedRow.Preduzece.Id_Preduzece;
   				$scope.editPartnerType = $scope.selectedRow.Tip_Partner;

		  });
   		};


   		$scope.search = {};
   		$scope.search.naziv= '';
   		$scope.search.PIB= '';
   		$scope.search.maticni_broj = '';

   		$scope.search.filterData = function(){

   			var naziv = $scope.search.naziv.trim();
   			var maticni = $scope.search.maticni_broj.trim();
   			var pib = $scope.search.PIB.trim();

   			if(pib==='' && naziv==='' && maticni==='')
   				return;

   			var url_filter = "?$filter="

   			var prvi= true;
   			
   			if(naziv!=''){
   				prvi =	false;
   				url_filter += "substringof('" + naziv + "', Naziv_Partner) eq true";
   			}

   			if(pib!=''){
   				if(!prvi){
   					url_filter += " and "
   				}

   				url_filter += "PIB_Partner eq " + pib;
   			}


   			if(maticni!=''){
   				if(!prvi){
   					url_filter += " and "
   				}

   				url_filter += "Maticni_broj_Partner eq " + maticni;
   			}

   			console.log(url_filter);
   			partneriService.get_filtered_partners(url_filter).then(function(response){
   				$scope.gridOptions.data = response;

   				$scope.search.naziv= '';
		   		$scope.search.PIB= '';
		   		$scope.search.maticni_broj = '';
   			});
   		}


    	function fillData(){

			partneriService.get_all_partners()
				.then(function(response){
				$scope.gridOptions.data = response;
			});

			preduzecaService.get_all_companies()
				.then(function(response){
				$scope.allCompanies = response;
			});

			mestaService.get_all_places()
				.then(function(response){
				$scope.allPlaces = response;
			});
		};
		
		$scope.fillData = fillData;

		$(".positiveInteger10").on("change paste keyup", function() {
			$scope.isPositiveInteger(this, 10);
		});		
		$(".positiveInteger8").on("change paste keyup", function() {
			$scope.isPositiveInteger(this, 8);
		});
		 

		fillData();

		$scope.clear_add = function(){
			$scope.partnerName ="";
			$scope.partnerMBR = "";
			$scope.partnerPIB = "";
			$scope.partnerAddress="";
			$scope.partnerPlace= "";
			$scope.checkPlace = "";
			$scope.changePlace = "";
			$scope.partnerType = "";
			$scope.changeType = "";
			$scope.checkType = "";
			$scope.partnerCompany = "";
			$scope.changeCompany = "";
			$scope.checkCompany = "";
			 
	    };

	     $scope.clear_add();

		$scope.add_partner = function()
		{
			partneriService.create_partner($scope.partnerId, $scope.partnerName, $scope.partnerMBR, $scope.partnerPIB, $scope.partnerAddress, $scope.checkPlace, $scope.checkCompany, $scope.checkType).then(function(response){
				$scope.clear_add();
				$state.go('^',{}, {reload:true});
			});
		};

		$scope.remove_selected_partner = function()
		{
			$scope.selectedRow = $scope.gridOptions.selection.getSelectedRows();
			partneriService.remove_partner($scope.selectedRow[0].Id_Partner).then(function(response){
				fillData();
				 
			});
		};

		$scope.edit_selected_partner = function(id, name, mbr, pib, address, place, company, type)
		{
			
			partneriService.update_partner(id, name, mbr, pib, address, place, company, type).then(function(response){
				fillData();
			});
		};

	    $scope.closeState = function()
	    {
	      $scope.clear_add();
	  	  $state.go('^',{}, {reload:true});
	    }

	}
];