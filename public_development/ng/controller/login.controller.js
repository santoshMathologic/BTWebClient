/**
 * 
 */

(function () {

	' use strict';
	var app = angular.module("BTApp");
	app.controller("loginCtrl", function ($scope, $state, $http, authFactory, $window, $timeout) {


		var isLoggedIn = authFactory.checkLoggedIn();
		$scope.isShow  = false;
		$scope.login = function (username, password) {
	    $scope.isShow  = true;
			authFactory.dologin(username, password).then(function successCallback(successResponse) {

				authFactory.isLogged = true;
				authFactory.username = successResponse.data.tokenKey.username;
				authFactory.userRole = successResponse.data.tokenKey.role;
				$window.sessionStorage.token = successResponse.data.tokenKey.token;
				$window.sessionStorage.username = successResponse.data.tokenKey.username;
				$window.sessionStorage.userRole = successResponse.data.tokenKey.role;

				$window.localStorage.token = successResponse.data.tokenKey.token;
				$window.localStorage.username = successResponse.data.tokenKey.username;
				$window.localStorage.userRole = successResponse.data.tokenKey.role;

				// $window.location.href='/';

				$timeout(function () {
					$state.go('home.dashboard');
					$scope.isShow = false;
				}, 3000);

			
			

             }, function errorCallback(errorResponse) {

				console.log("errorResponse" + errorResponse);
				alert("User not authorized.");


			});



};

	});

})();
