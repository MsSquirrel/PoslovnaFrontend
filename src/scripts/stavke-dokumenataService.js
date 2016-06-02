module.exports = [
	'$http', '$window', '$q',
	function stavkeDokumenataService($http, $window, $q){

		function get_all_documentItems()
		{

			var resUrl = "http://localhost:61769/api/stavka_dokumenta";
			return $http.get(resUrl)
			.then(function(response) {
				return response.data;
			});
		}

		function create_documentItem(primka, roba, kolicina, nabCena, marza)
		{	

			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/stavka_dokumenta",
                    data: {
                    	Id_Prijemni_dokument: primka,
						Id_Roba: roba, 
						Kolicina_Stavka_dokumenta: kolicina,
						Nabavna_cena_Stavka_dokumenta: nabCena,
						Nabavna_vrednost_Stavka_dokumenta: nabCena*kolicina,
						Procenat_marze_Stavka_dokumenta: marza
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka.");
			});
		}

		function remove_documentItem(id)
		{
			var urlDelete = "http://localhost:61769/api/stavka_dokumenta/"+id+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	}).error(function(response, data){
				alert("Neuspešno brisanje.");
			});
		}

		function update_documentItem(id, primka, roba, kolicina, nabCena, marza)
		{	
			var url = "http://localhost:61769/api/stavka_dokumenta/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
                    	Id_Stavka_dokumenta: id,
                    	Id_Prijemni_dokument: primka,
						Id_Roba: roba, 
						Kolicina_Stavka_dokumenta: kolicina,
						Nabavna_cena_Stavka_dokumenta: nabCena,
						Nabavna_vrednost_Stavka_dokumenta: nabCena*kolicina,
						Procenat_marze_Stavka_dokumenta: marza
					}
           	}).success(function(response){
				return response.data;				
			}).error(function(response, data){
				alert("Neuspešan unos podataka.");
			});
		}

		function get_documentItem_by_id(id)
		{
			var resUrl = "http://localhost:61769/api/stavka_dokumenta/"+id+"/";
			return $http.get(resUrl)
				.then(function(response) {
					return response.data;
			});	
		}


		return {
			get_all_documentItems: get_all_documentItems, 
			create_documentItem: create_documentItem, 
			update_documentItem: update_documentItem, 
			remove_documentItem: remove_documentItem,
			get_documentItem_by_id: get_documentItem_by_id,
		};


	}
];