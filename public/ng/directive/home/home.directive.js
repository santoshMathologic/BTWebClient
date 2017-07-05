' use strict';

angular.module('BTApp')
    .directive('home', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/home/home.tmpl.html',
            controller: function ($scope,$state,$window,$location,authFactory) {
            if(!$state.current|| ($state.current && $state.current.name != 'home.login' && !authFactory.checkLoggedIn())){
                    $state.go('home.login');
                }
                     
            


            }

        };
    }]);