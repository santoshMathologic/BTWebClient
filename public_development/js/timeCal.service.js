/**
 *  Time calculator Services
 *  
 */

(function () {
    var app = angular.module("BTApp");
    app.service("timeCalculator", function ($scope) {

        var convertDateTimeObjToNumber = function () {
            console.log("Convert Date Time object to Number ");

        };


        var timeCal = {
            convertDateTimeObjToNumber: convertDateTimeObjToNumber
        };

        return timeCal;
    });

})();