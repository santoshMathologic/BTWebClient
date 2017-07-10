/**
 * @namespace BTApp
 */
var app = angular.module("BTApp");
app.service("timeCalculatorService", function () {
    /**
    * @function convertDateTimeObjToNumber
    * @param  {object} dateTimeObj user to take dateTimeObj as object 
    * @param  {string} target user to take target as string 
    * @returns {String} Result is calculation of startTime With day
    * @author santosh
    * @description The parameters of a function call are the function's arguments. Arguments are passed to functions by value. If the function changes the value of an argument, this change is not reflected globally or in the calling function. However, object references are values, too, and they are special: if the function changes the referred object's properties, that change is visible outside the function, as shown in the following example:
    * @since  2017
    * @version 0.0.1
    */
    var convertDateTimeObjToNumber = function (dateTimeObj, target) {
        if (dateTimeObj === null || dateTimeObj === undefined || typeof dateTimeObj !== 'object') {
            throw new Error("Not valid dateTimeObject passed to method()");
        }
        if (dateTimeObj.day === null || dateTimeObj.time === null) {
            throw new Error("Not valid dateTimeObject passed to convertDateTimeObj()");
        }

        if (target === null) {
            target = "";
        }
        target = target.toLowerCase();

        var timeParts = dateTimeObj.time.split(":");
        var hrs = parseInt(timeParts[0]);
        var min = parseInt(timeParts[1]);

        if ((hrs > 23 || hrs < 0) && (min > 59 || min < 0)) {
            throw new Error("Not valid dateTimeObj.time passed to convertDateTimeObj()");
        }
        var mins = (dateTimeObj.day * 1440) + (hrs * 60) + (min);
        var result = null;


        switch (target) {
            case 'mins': case 'min': case 'minutes': case 'minute':
                result = mins;
                break;
            case 'hrs': case 'hr': case 'hours': case 'hour':
                result = (mins / 60);
                break;
            case 'days': case 'day':
                result = (mins / 1440);
                break;
            default:
                result = mins;
                break;
        }

        return result;

    };


    var timeCal = {
        convertDateTimeObjToNumber: convertDateTimeObjToNumber
    };

    return timeCal;
});

