module.exports = [
    '$scope', '$http', 'loginService', '$location',
    function myController($scope, $http, loginService,$location){

        $scope.username = "";
        $scope.password = "";
        $scope.passwordRepeat = "";
        $scope.firstName = "";
        $scope.lastName = "";

        var regCallback = function(success){
            if(success){
                alert('Uspešna registracija. Ulogujte se da biste nastavili.');
            }else{
                alert('Registracija neuspešna. Probajte drugo korisničko ime.');
            }

        }
        
        $scope.register = function () {
            
            loginService.register($scope.username,$scope.password, $scope.firstName, $scope.lastName, regCallback);
        };
        
        $scope.checkMatching = function() {
            if ((typeof $scope.password !== "undefined") && (typeof $scope.passwordRepeat !== "undefined") &&
                $scope.password !== "" && $scope.passwordRepeat !== "") {
                $scope.createRegisterForm.pass2.$setValidity("minLength", $scope.password == $scope.passwordRepeat);
            } else {
                $scope.createRegisterForm.pass2.$setValidity("minLength", true);
            }
        };


    }
];