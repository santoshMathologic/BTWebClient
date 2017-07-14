' use strict';

angular.module('BTApp')
    .directive('header', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/header/header.tmpl.html',
            controller: function ($scope, $window, $state, $http) {

                $scope.hideShow = function () {
                    console.log("Dasdas");
                };

                $scope.logout = function () {
                    //$window.location.href="/login";

                    $http({
                        method: 'GET',
                        url: "http://localhost:4000/logout"
                    }).then(function (successresponse) {
                       $state.go('home.login', {}, { reload: true });
                    }, function (errorresponse) {

                    });

                    



                };

            }

        };
    }]);