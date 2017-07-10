describe('login', function () {
		
	beforeEach(angular.mock.module('BTApp'));

	var $controller;
	var authFactory;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	
    
    
    beforeEach(inject(function (_authFactory_) {
        authFactory = _authFactory_;
    }));

    it('should exist', function () {
        expect(authFactory).toBeDefined();
    });


	describe('test for username and password are correct', function () {
		it('username should equal test and password should equal test', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
			$scope.username = test;
			$scope.password = test;
			$scope.login();
			//expect($scope.z).toBe(3);
		});	
	});

});