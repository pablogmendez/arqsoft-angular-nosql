'use strict';

angular.module('yapp')
.controller('LoginCtrl', function ($scope, $location, $http, ApplicationStateService) {
    $scope.submit = function() {
    	$http.post(ApplicationStateService.serverUrl + '/login', {record: $scope.record})
	    	.success(function (data) {
	    		ApplicationStateService.setStudent(data);
	    		$location.path("/dashboard"), !1
	    	})
	    	.error(function (data) {
	    		alert('Usuario inexistente');
	    	});
    };
});
