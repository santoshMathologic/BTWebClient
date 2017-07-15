' use strict';
    var api = {
        protocol: 'http',
        server: 'localhost',
        port: 3000,
        baseUrl: '/api/v1',
    };

    var apiUrl = api.protocol + "://" + api.server + ":" + api.port + api.baseUrl;
    var apiLoginUrl = apiUrl.replace(api.baseUrl, "/login");

var app = angular.module('BTApp');
app.factory('authFactory', function ($state, $http, $base64, $location, $window, jwtHelper,$cookieStore) {
    var auth = {
        isLogged: false,
        username : '',
        userRole:'',

        checkLoggedIn: function () {
            if ($window.sessionStorage.token) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
            }
            return (this.isLogged) ? this.isLogged : false;
        },
        dologin: function (username, password) {
            
            var authEncr =  $base64.encode(username+":"+password);
		    return $http({
                 method:'GET',
                 url:apiLoginUrl,
                 headers:{
                      'Authorization':'Basic '+ authEncr
                     

                 }
             });
         
        },
        logout: function () {

             if (!this.isLogged) {

                 this.isLogged = false;
                 delete this.username;
                 delete this.userRole;
                 delete $window.sessionStorage.token;
                 delete $window.sessionStorage.username;
                 delete $window.sessionStorage.userRole;
                 
                 delete $window.localStorage.token;
                 delete $window.localStorage.username;
                 delete $window.localStorage.userRole;
                
                 delete $cookieStore.username;
                 delete $cookieStore.userRole;
                 
                 $cookieStore.remove("username");
                 $cookieStore.remove("userRole");                 
                 //delete $cookies["userInfo"]  
                 $cookieStore = {};
                 $cookies = {};

               
             }

         }


    };
    return auth;


});