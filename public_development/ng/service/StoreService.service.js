
' use strict';
(function(){

var app = angular.module("BTApp");

app.service("storageService",function($window){

  console.log("at store Service ");

  var windowDecodeToken = {}; 
        return {
          
            setLocalStorage: function (decodedToken){
              $window.localStorage.username = decodedToken.username;
              $window.sessionStorage.token = decodedToken.token;
              $window.sessionStorage.username = decodedToken.username; // to fetch the user details on refresh
              $window.sessionStorage.userRole = decodedToken.role; // to fetch the user details on refresh
              windowDecodeToken =$window.sessionStorage;
            },
          
            getLocalStorage: function(){
              return windowDecodeToken;
            }
        };
  
});

})();

