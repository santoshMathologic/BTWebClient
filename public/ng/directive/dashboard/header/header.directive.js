' use strict';

angular.module('BTApp')
    .directive('header', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/header/header.tmpl.html',
            controller: function ($scope,$window,$state) {
                
                $scope.hideShow = function () {
                    console.log("Dasdas");
                };

                $scope.logout = function(){
                //$window.location.href="/login";
               $state.go('home.login', {}, { reload: true });


                };

            }

        };
    }]);