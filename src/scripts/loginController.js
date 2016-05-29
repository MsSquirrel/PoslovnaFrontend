
module.exports = [
    '$scope', '$http', 'loginService', '$location',
    function myController($scope, $http, loginService,$location){

        $scope.user={
            username: "Username",
            password: "Password"
        };
        $scope.login=function () {
            loginService.login($scope.user.username,$scope.user.password,loginCbck);
        };
        function loginCbck(success) {
            if (success) {
                $scope.refreshUser();
                window.location = "#/main";
            }
            else{
                alert('failure!');
            }
        }
    }
];