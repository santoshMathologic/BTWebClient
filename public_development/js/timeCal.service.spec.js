

describe('timeCalculator Service', function () {

    var timeCalculatorService;
    beforeEach(angular.mock.module('BTApp'));
    var objeTime = {
                time: "12:30:00",
                day: 2
            };
  
    beforeEach(inject(function (_timeCalculatorService_) {
        timeCalculatorService = _timeCalculatorService_;
    }));

    it('should exist', function () {
        expect(timeCalculatorService).toBeDefined();
    });


    it('convertDateTimeObjToNumber should return min',
        inject(function (timeCalculatorService) {          
            expect(timeCalculatorService.convertDateTimeObjToNumber(objeTime, "mins")).toEqual(3630);
        }));

it('convertDateTimeObjToNumber should return Hrs',
        inject(function (timeCalculatorService) {          
            expect(timeCalculatorService.convertDateTimeObjToNumber(objeTime, "hrs")).toEqual(60.5);
        }));

    it('convertDateTimeObjToNumber should return days',
        inject(function (timeCalculatorService) {          
            expect(timeCalculatorService.convertDateTimeObjToNumber(objeTime, "days")).toEqual(2.5208333333333335);
        }));

});