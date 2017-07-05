' use strict';

angular.module('BTApp')
    .directive('sidebar', ['$compile', function ($compile) {
        return {
            restrict: 'E',
            templateUrl: 'ng/directive/dashboard/sidebar/sidebar.tmpl.html',
            controller: function ($scope) {

                $scope.hideSideBar = false;
                angular.element('#wrapper').addClass("hide-wrapper");
                


            }

        };
    }]);