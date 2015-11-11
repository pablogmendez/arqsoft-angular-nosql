"use strict";

angular.module('yapp')
	.filter('unique', function (underscore) {
	    return function (arr, field) {
	        return underscore.uniq(arr, function(a) { return a[field]; });
	    };
	});
