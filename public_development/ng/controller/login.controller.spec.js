" use strict";

describe('login', function () {

	beforeEach(module('BTApp'));

	var $controller;


	beforeEach(inject(function (_$controller_) {
		$controller = _$controller_;
	}));

	describe('factory: AuthFactory', function () {
		var factory = null;
		beforeEach(inject(function (authFactory) {
			factory = authFactory;
		}));
		it('Should define methods', function () {
			expect(factory.dologin("test","test")).toBeDefined();
			
		});
	});




});