' use strict';

angular.module('BTApp')
    .directive('footer', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/footer/footer.tmpl.html',
            controller: function ($scope) {


            }

        };
    }]);