module.exports = [
	'$http', '$window', '$q',
	function magaciniService($http, $window, $q){

		function get_all_warehouses()
		{
			var resUrl = "http://localhost:61769/api/magacin";
			return $http.get(resUrl).then(function(response) {
				return response.data;
			});
		}

		function create_warehouse(id, name, address, place, company)
		{
			return $http({
                    method: "post",
                    url: "http://localhost:61769/api/magacin",
                    data: {
				   		Id_Magacin: id,
				   		Naziv_Magacin: name,
				   		Adresa_Magacin: address,
				   		Id: place,
				   		Id_Preduzece: company
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		function remove_warehouse(warehouseId)
		{
			var urlDelete = "http://localhost:61769/api/magacin/"+warehouseId+"/";
		    return $http({
                method: "delete",
                url: urlDelete
           	});
		}

		function update_warehouse(id, name, address, place, company)
		{
			var url = "http://localhost:61769/api/magacin/"+id+"/";
			return $http({
                    method: "put",
                    url: url,
                    data: {
				   		Id_Magacin: id,
				   		Naziv_Magacin: name,
				   		Adresa_Magacin: address,
				   		Id: place,
				   		Id_Preduzece: company
					}
           	}).then(function(response){
				return response.data;				
			});
		}

		return {
			get_all_warehouses: get_all_warehouses,
			create_warehouse: create_warehouse,
			remove_warehouse: remove_warehouse,
			update_warehouse: update_warehouse, 
		};

	}
];