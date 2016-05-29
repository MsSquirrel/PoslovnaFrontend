
module.exports = [
    '$http', '$window', '$q', '$localStorage', 'jwtHelper',
    function loginService($http, $window, $q, $localStorage, jwtHelper){

        var service = {};

        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;

        return service;

        function login(username, password, callback) {

            alert('serv');
            $.post( '/api/korisnici/login', { username: username, password: password } )
                .done(function (response) {
                    // ukoliko postoji token, prijava je uspecna
                    if (response) {
                        // korisnicko ime, token i rola (ako postoji) cuvaju se u lokalnom skladištu
                        var currentUser = { username: username, token: response }
                        var tokenPayload = jwtHelper.decodeToken(response);
                        if(tokenPayload.role){
                            currentUser.role = tokenPayload.role;
                        }
                        // prijavljenog korisnika cuva u lokalnom skladistu
                        $localStorage.currentUser = currentUser;
                        // jwt token dodajemo u to auth header za sve $http zahteve
                        $http.defaults.headers.common.Authorization = response.token;
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
        }

        function getCurrentUser() {
            return $localStorage.currentUser;
        }

    }
];