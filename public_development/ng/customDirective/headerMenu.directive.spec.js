describe('headerMenu:directive', function () {

    var scope, $compile, element, myService;

    beforeEach(angular.mock.module('BTApp'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _myService_) {
        scope = _$rootScope_.$new();
        $compile = _$compile_;
        myService = _myService_;

        var html = '<header-menu></header-menu>';
        element = $compile(angular.element(html))(scope);
        scope.$digest();
    }));

    it('should return an unordered list', function () {
        var ul = element.find('ul');
        expect(ul).toBeDefined();
    });

});