module.exports = [
	'$scope', '$http', '$localStorage', 'loginService',
	function myController($scope, $http, $localStorage, loginService){
		
		$scope.currentUser  = $localStorage.currentUser;

		if (!$scope.currentUser && window.location != "#/login"){
			window.location = "#/login";
		}

        $scope.logout=function () {
            loginService.logout();
            $scope.refreshUser();
        };

        $scope.refreshUser = function() {
            $scope.currentUser  = $localStorage.currentUser;
        }

        $scope.isPositiveInteger = function(loc) { //".positiveInteger"
			if (isNaN($(loc).val()) || $(loc).val() < 0 || ($(loc).val() % 1 != 0)) {
				$(loc).css("background-color", "#F33");
				var element = $(loc).next();
				if (!$(element).hasClass("writeError"))
					$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite pozitivan, ceo broj!</span>");
			} else {
				$(loc).css("background-color", "white");
				var element = $(loc).next();
				if ($(element).hasClass("writeError"))
					$(element).remove();
			}

			var errCount = $(loc).parents("form").find('.writeError').length;

			if (errCount != 0)
				$(loc).parents("form").find('.accept').attr("disabled", true);
			else
				$(loc).parents("form").find('.accept').attr("disabled", false);
		}

        $scope.isPositiveDecimal = function(loc) { //".positiveDecimal"
			if (isNaN($(loc).val()) || $(loc).val() < 0) {
				$(loc).css("background-color", "#F33");
				var element = $(loc).next();
				if (!$(element).hasClass("writeError"))
					$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite pozitivan broj!</span>");
				$(loc).parents("form").find('.accept').attr("disabled", true);
			} else {
				$(loc).css("background-color", "white");
				var element = $(loc).next();
				if ($(element).hasClass("writeError"))
					$(element).remove();
				$(loc).parents("form").find('.accept').attr("disabled", false);
			}

			var errCount = $(loc).parents("form").find('.writeError').length;

			if (errCount != 0)
				$(loc).parents("form").find('.accept').attr("disabled", true);
			else
				$(loc).parents("form").find('.accept').attr("disabled", false);
		}

        $scope.clearInput = function(scopee) {

			var inputs = $(scopee).find('input');
			$(inputs).each(function(index) {
				$(this).css("background-color", "white");
			})

			$(scopee).find('.accept').attr("disabled", false);

			var errors = $(scopee).find('.writeError');
			$(errors).each(function(index) {
				$(this).remove();
			})
		}

	}
];