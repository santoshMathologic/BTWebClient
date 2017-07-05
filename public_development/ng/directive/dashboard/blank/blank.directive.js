' use strict';

angular.module('BTApp')
    .directive('blank', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/blank/blank.tmpl.html',
            controller: function ($scope,authFactory) {
                
                authFactory.checkLoggedIn();

            }

        };
    }]);