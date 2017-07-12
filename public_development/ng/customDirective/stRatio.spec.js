describe("directive:stRation", function () {

    var scope,element;
        beforeEach(module('BTApp'));

    beforeEach(inject(function ($rootScope, $compile) {

        element = angular.element('<st-ratio></st-ratio>');

        scope = $rootScope;
        $compile(elm)(scope);
        scope.$digest();


    }));


});

