

var app = angular.module("BTApp");
app.directive("upload", ['$compile', function ($compile) {

  return {
    restrict: 'E',
    templateUrl: 'ng/directive/dashboard/upload/upload.tmpl.html',
    controller: function ($scope,Upload) {


     
    },
    link: function preLink(scope, elem, attr) {

    }

  };



}]);