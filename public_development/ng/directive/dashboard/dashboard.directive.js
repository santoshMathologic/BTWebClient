' use strict';

var app = angular.module('BTApp');
    app.directive('dashboard', ['$compile', function($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/dashboard.tmpl.html',
            controller: function($scope, $state,$location) {

            	
                
            }

        };
    }]);