
module.exports = [
    '$http', '$window', '$q', '$localStorage', 'jwtHelper',
    function loginService($http, $window, $q, $localStorage, jwtHelper){

        var service = {};

        service.login = login;
        service.logout = logout;
        service.getCurrentUser = getCurrentUser;
        service.register = register;
        service.edit = edit;

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
                        if(tokenPayload.id){
                            currentUser.id = tokenPayload.id;
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

        function register(username, password, firstName, lastName, callback) {

            $http.post('http://localhost:61769/api/korisnik/', {Korisnicko_ime_Korisnik: username,
                                                                Lozinka_Korisnik: password,       
                                                                Ime_Korisnik: firstName,
                                                                Prezime_Korisnik: lastName})
                .success(function (response) {                 
                    callback(true);
                    window.location = "#/login";
                }).error(function (response){
                    callback(false);
                });

        }

        function edit(id, username, firstName, lastName, password, callback) {
         
            $http.put('http://localhost:61769/api/korisnik/' + id, {Id_Korisnik: id,
                                                                Korisnicko_ime_Korisnik: username,
                                                                Lozinka_Korisnik: password,       
                                                                Ime_Korisnik: firstName,
                                                                Prezime_Korisnik: lastName})
                .success(function (response) {                 

                    $http.post('http://localhost:61769/api/login/' + username + '/' + password)
                    .success(function (response) {
                    
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
                        if(tokenPayload.id){
                            currentUser.id = tokenPayload.id;
                        }
                        // prijavljenog korisnika cuva u lokalnom skladistu
                        $localStorage.currentUser = currentUser;
                        // jwt token dodajemo u to auth header za sve $http zahteve
                        $http.defaults.headers.common.Authorization = response;
                        callback(true);
                    }else{
                        
                        callback(false);
                    } 
                });

                    window.location = "#/main";
                }).error(function (response){
                    
                    callback(false);
                });

        }

    }
];