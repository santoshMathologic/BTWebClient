describe("directive:stRation", function () {

    var scope, element;
    beforeEach(angular.mock.module('BTApp'));

    it('should get called on a click', inject(function ($rootScope, $compile) {
        element = $compile('<div ng-click="clicked = true"></div>')($rootScope);
        $rootScope.$digest();
        expect($rootScope.clicked).toBeFalsy();

        browserTrigger(element, 'click');
        expect($rootScope.clicked).toEqual(true);
    }));



});

