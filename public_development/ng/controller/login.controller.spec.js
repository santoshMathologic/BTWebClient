describe('login', function () {
		
	beforeEach(angular.mock.module('BTApp'));

	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));

	describe('test for username and password are correct', function () {
		it('username should equal test and password should equal test', function () {
			var $scope = {};
			var controller = $controller('loginCtrl', { $scope: $scope });
			$scope.username = test;
			$scope.password = test;
			$scope.login();
			expect($scope.z).toBe(3);
		});	
	});

});