

describe('timeCalculator Service', function() {

 var timeCalculatorService;
beforeEach(angular.mock.module('BTApp'));

  beforeEach(inject(function(_timeCalculatorService_) {
    timeCalculatorService = _timeCalculatorService_;
  }));

  it('should exist', function() {
    expect(timeCalculatorService).toBeDefined();
  });


});