/**
 * 
 */

' use strict';

var app = angular.module("BTApp");
app.directive("stRatio", [ '$compile', function($compile) {

	 return {
		 	link: function(scope, element,attr) {
		 		  var ratio=+(attr.stRatio);
				  element.css('width',ratio+'%');
								
				  scope.addClient = function() {

					console.log("at link function");

         		};
		 		
			 },
					 
			  
		 
	 };
}]);
