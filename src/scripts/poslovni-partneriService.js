module.exports = [
	'$http', '$window', '$q',
	function partneriService($http, $window, $q){

		function get_all_partners()
		{
			var resUrl = "http://localhost:61769/api/poslovni_partner";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_partner(id, name, mbr, pib, address, place, company, type)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/poslovni_partner",
                    data: {
                    	Id_Partner: id,
						Id_Preduzece: company, 
						Id: place,
						Tip_Partner: type,
						Naziv_Partner: name,
						Maticni_broj_Partner: mbr,
						PIB_Partner: pib,
						Adresa_Partner: address
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_partner(partnerId)
		{
			var urlDelete = "http://localhost:61769/api/poslovni_partner/"+partnerId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}


		function update_partner(id, name, mbr, pib, address, place, company, type)
		{
			var url = "http://localhost:61769/api/poslovni_partner/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Partner: id,
						Id_Preduzece: company, 
						Id: place,
						Tip_Partner: type,
						Naziv_Partner: name,
						Maticni_broj_Partner: mbr,
						PIB_Partner: pib,
						Adresa_Partner: address
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function get_partner_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/poslovni_partner/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}


		return {
			get_all_partners: get_all_partners,
			create_partner: create_partner,
			remove_partner: remove_partner,
			update_partner: update_partner,
			get_partner_by_id: get_partner_by_id, 
		};

	}
];