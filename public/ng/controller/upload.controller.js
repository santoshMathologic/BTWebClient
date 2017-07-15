
' use strict';

(function () {

    var app = angular.module("BTApp");
    app.controller("uploadCtrl", function (Upload, $scope) {


        $scope.progressPercentage = 0;
        $scope.trainTimeTableDetails = function () {

            if ($scope.trainTimeTableForm.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            }
        };

        $scope.upload = function (file) {
            Upload.upload({
                url: "http://localhost:3000/api/v2/uploads/timetable",
                data: { file: file}
                 
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


    });

})();
