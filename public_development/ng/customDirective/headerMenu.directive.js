/**
 * 
 */

' use strict';
var app = angular.module("BTApp");
app.directive("headerMenu", ['$compile', function ($compile) {

    return {
        restrict: 'E',
        replace: true,
        controllerAs: 'vm',
        transclude: true,
        templateUrl: "ng/customDirective/template/headerMenu.html",
        link: function (scope, element, attrs, vm) {

            function getData(index) {
                if (index) {
                    vm.hideItem = true;
                } else {
                    var li = element.find("li");
                    li.attr("context-driven", "");
                }
            }
            function getIndex() {
                index = 3;
                getData(index);
            }

            getIndex();

        },
         controller: function(){

         },

    };
}]);
