
module.exports = [
    '$http', '$window', '$q', '$localStorage', 'jwtHelper',
    function loginService($http, $window, $q, $localStorage, jwtHelper){

        var service = {};

        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;

        return service;

        function login(username, password, callback) {

            $http.post('http://localhost:61769/api/login/' + username + '/' + password)
                .success(function (response) {
                    // ukoliko postoji token, prijava je uspecna
                     if (response) {
                        // korisnicko ime, token i rola (ako postoji) cuvaju se u lokalnom skladištu
                        var currentUser = { username: username, token: response }
                        var tokenPayload = jwtHelper.decodeToken(response);
                        if(tokenPayload.role){
                            currentUser.role = tokenPayload.role;
                        }
                        if(tokenPayload.firstName){
                            currentUser.firstName = tokenPayload.firstName;
                        }
                        if(tokenPayload.lastName){
                            currentUser.lastName = tokenPayload.lastName;
                        }
                        // prijavljenog korisnika cuva u lokalnom skladistu
                        $localStorage.currentUser = currentUser;
                        // jwt token dodajemo u to auth header za sve $http zahteve
                        $http.defaults.headers.common.Authorization = response;
                        // callback za uspesan login
                        callback(true);
                    } else {
                        // callback za neuspesan login
                        callback(false);
                    }
                });

        }

        function logout() {
            // uklonimo korisnika iz lokalnog skladišta
            delete $localStorage.currentUser;
            $http.defaults.headers.common.Authorization = '';
            $window.location = "#/login";
        }

        function getCurrentUser() {
            return $localStorage.currentUser;
        }

    }
];