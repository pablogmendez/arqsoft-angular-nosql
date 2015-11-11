'use strict';

var ResultsCtrl = angular.module('yapp')
  .controller('ResultsCtrl', function ($rootScope, $scope, $http, $filter, underscore, ApplicationStateService) {

	// Funcion para buscar estudiantes inscriptos a materias
	function findStudents() {
		$http.get(ApplicationStateService.serverUrl + "/courses/" + $scope.searchCourse._id)
			.success(function (response) {
				$scope.names = response.students;
			})
			.error(function (response) {
				console.log(response);
			});
  	};

	// Función para inscribir alumnos
	function studentsRecord() {
		$http.put(ApplicationStateService.serverUrl + "/course/" + $scope.searchCourse._id + "/students", {student: ApplicationStateService.getStudent()._id})
			.success(function (data) {
				alert("Inscripción exitosa");
		    })
		    .error(function (data) {
			     alert('Inscripción no exitosa');
		    });
	};

	$scope.model = {
		terms: ApplicationStateService.getTerms(),
		years: ApplicationStateService.getYears(),
		courses: ApplicationStateService.getCourses()
	};

	$scope.handlers = {
		findStudents: findStudents,
		studentsRecord: studentsRecord
	};

  });

ResultsCtrl.loadCourses = ['$q', '$http', 'underscore', 'ApplicationStateService', function ($q, $http, underscore, ApplicationStateService) {
	var deferred = $q.defer();
	if (!underscore.isEmpty(ApplicationStateService.getCourses())) {
		deferred.resolve();
	} else {
		$http.get(ApplicationStateService.serverUrl + '/courses').success(function (data) {
			ApplicationStateService.setCourses(data);
			var terms = underscore.map(data, function(element) {
				return {
					year: element.year,
					term: element.term
				}
			});
			var years = underscore.chain(terms)
				.map(function(element) {
					return element.year;
				})
				.uniq().value()
			ApplicationStateService.setTerms(terms);
			ApplicationStateService.setYears(years);
			deferred.resolve();
		});
	}
	return deferred.promise;
}];
