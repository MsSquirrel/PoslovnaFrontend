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

        $scope.isPositiveInteger = function(loc, numberLength = 0) { //".positiveInteger"
        	var value = $(loc).val();
        	if (numberLength != 0) {
				if (isNaN(value) || value < 0 || (value % 1 != 0) || (value.length != numberLength && value.length != 0) ) {
					$(loc).css("border", "1px solid #F00");
					var element = $(loc).next();
					if (!$(element).hasClass("writeError"))
						$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite pozitivan, ceo broj, duzine " + numberLength + "!</span>");
				} else {
					$(loc).css("border", "1px solid #CCC");
					var element = $(loc).next();
					if ($(element).hasClass("writeError"))
						$(element).remove();
				}
        	} else {
				if (isNaN(value) || value < 0 || (value % 1 != 0)) {
					$(loc).css("border", "1px solid #F00");
					var element = $(loc).next();
					if (!$(element).hasClass("writeError"))
						$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite pozitivan, ceo broj!</span>");
				} else {
					$(loc).css("border", "1px solid #CCC");
					var element = $(loc).next();
					if ($(element).hasClass("writeError"))
						$(element).remove();
				}
			}

			var errCount = $(loc).parents("form").find('.writeError').length;

			if (errCount != 0)
				$(loc).parents("form").find('.accept').attr("disabled", true);
			else
				$(loc).parents("form").find('.accept').attr("disabled", false);
		}

        $scope.isPositiveDecimal = function(loc) { //".positiveDecimal"
			if (isNaN($(loc).val()) || $(loc).val() < 0) {
				$(loc).css("border", "1px solid #F00");
				var element = $(loc).next();
				if (!$(element).hasClass("writeError"))
					$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite pozitivan broj!</span>");
			} else {
				$(loc).css("border", "1px solid #CCC");
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

        $scope.isCharacter = function(loc, stringLength = 0) { //".characters"
        	var value = $(loc).val();
			if (value.length > stringLength && value.length != 0) {
				$(loc).css("border", "1px solid #F00");
				var element = $(loc).next();
				if (!$(element).hasClass("writeError"))
					$(loc).after("<span class=\"writeError\" style=\"color:red\">Unesite niz karaktera, duzine do " + stringLength + "!</span>");
			} else {
				$(loc).css("border", "1px solid #CCC");
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

        $scope.clearInput = function(scopee) {

			var inputs = $(scopee).find('input');
			$(inputs).each(function(index) {
				$(this).css("border", "1px solid #CCC");
			})

			$(scopee).find('.accept').attr("disabled", false);

			var errors = $(scopee).find('.writeError');
			$(errors).each(function(index) {
				$(this).remove();
			})
		}

	}
];