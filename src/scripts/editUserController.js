
module.exports = [
    '$scope', '$http', 'loginService', '$location',
    function myController($scope, $http, loginService,$location){

        $scope.username = $scope.currentUser.username;
        $scope.firstName = $scope.currentUser.firstName;
        $scope.lastName = $scope.currentUser.lastName;
        $scope.password = "";
        $scope.passwordRepeat = "";

        var editCbck = function(success){
            if(success){
                alert("Izmene izvršene uspešno.");
                $scope.refreshUser();
                $scope.username = $scope.currentUser.username;
                $scope.firstName = $scope.currentUser.firstName;
                $scope.lastName = $scope.currentUser.lastName;
                $scope.password = "";
                $scope.passwordRepeat = "";
            }else{
                alert("Izmene neuspešne. Uneti su neispravni podaci.");
            }
        }

        $scope.editUser=function () {

            loginService.edit($scope.currentUser.id, $scope.username,$scope.firstName, $scope.lastName, $scope.password ,editCbck);
        };

        $scope.checkMatching = function() {
            if ($scope.password !== "" && $scope.passwordRepeat !== "") {
                $scope.createRegisterForm.pass2.$setValidity("minLength", $scope.password == $scope.passwordRepeat);
            } else {
                $scope.createRegisterForm.pass2.$setValidity("minLength", true);
            }
        };
        
    }
];