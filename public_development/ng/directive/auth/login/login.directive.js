' use strict';

var app = angular.module('BTApp');
    app.directive('login', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/auth/login/login.tmpl.html',
            controller: function ($scope,$state) {

            

            }

        };
    }]);