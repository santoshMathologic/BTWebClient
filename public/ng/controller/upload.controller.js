
' use strict';

(function(){

var app = angular.module("BTApp");
app.controller("uploadCtrl",function(Upload,$scope){


    $scope.progressPercentage = 0;
    $scope.trainTimeTableDetails = function(){

        if ($scope.trainTimeTableForm.trainTimeTableFile.$valid && $scope.trainTimeTableFile) {

            


               
        }


         Upload.upload({
                url: "http://localhost:4000/api/v2/uploads/timetable",
                data: { file: $scope.trainTimeTableFile}
            }).then(function successResponse(successResp) {
                console.log(successResp);
                
                
            }, function errorResponse(errorResp) {
                console.log(errorResp);
            }, function (evt) {
                $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                $scope.progress = Math.round(evt.loaded * 100 / evt.total);
                console.log("" + $scope.progressPercentage);
                //console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
            });

        
    };



    
});

})();
