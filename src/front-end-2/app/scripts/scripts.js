"use strict";

// Router
angular.module("yapp",["ui.router","ngAnimate"])
.config(["$stateProvider","$urlRouterProvider",function(r,t){t.when("/dashboard","/dashboard/overview"),t.otherwise("/login"),r.state("base",{"abstract":!0,url:"",templateUrl:"views/base.html"})
.state("login",{url:"/login",parent:"base",templateUrl:"views/login.html",controller:"LoginCtrl"})
.state("dashboard",{url:"/dashboard",parent:"base",templateUrl:"views/dashboard.html",controller:"DashboardCtrl"})
.state("overview",{url:"/overview",parent:"dashboard",templateUrl:"views/dashboard/overview.html"})
.state("results",{url:"/results",parent:"dashboard",templateUrl:"views/dashboard/results.html"})
.state("registrations",{url:"/registrations",parent:"dashboard",templateUrl:"views/dashboard/registrations.html"})
.state("reports",{url:"/reports",parent:"dashboard",templateUrl:"views/dashboard/reports.html"})}]),


// Controller para el login
angular.module("yapp")
.controller("LoginCtrl",["$scope","$location", "$rootScope",function(r,t,s){r.submit=function(){s.padron=r.padron; return t.path("/dashboard"),!1}}]),
angular.module("yapp").controller("DashboardCtrl",["$scope","$state",function(r,t){r.$state=t}]).


// Controller para 
controller('ResultsCtrl', function($scope, $http, $rootScope) {

	// Obtengo los años y cuatrimestres
	$http.get("http://localhost:3000/coursesy").success(function (response) {$scope.anio = response;});

	// Le asigno año y cuatrimestre al model cuatri
	$http.get("http://localhost:3000/courses").success(function (response2) {$scope.cuatri = response2;});

	// Obtengo los años y cuatrimestres y cursos y se los asigno al model materia
	$http.get("http://localhost:3000/coursesa").success(function (response3) {$scope.cursos = response3;});

	// Funcion para buscar estudiantes inscriptos a materias
	$scope.findStudents = function(){
		$http.get("http://localhost:3000/courses/" + $scope.searchCourse._id).success(function (response) {
			$scope.names = response.students;
		});
//		$scope.names=new Array();
//		for(var i=0; i < $scope.materia.length; i++ ) {
//			if($scope.cursos[i].year == $scope.searchYear.year && $scope.cursos[i].term == $scope.searchTerm.term && $scope.cursos[i].name == 				$scope.searchCourse.name) {
//				for(var j=0; j < $scope.cursos[i].students.length; j++) {
//					for(var k=0; k < $scope.estudiantes.length; k++) {
//						if($scope.cursos[i].students[j]._id == $scope.estudiantes[k]._id) {
//							$scope.names.push({firstName: $scope.estudiantes[k].firstName,
//									lastName: $scope.estudiantes[k].lastName,
//									age: $scope.estudiantes[k].age,
//									phone: $scope.estudiantes[k].phone});
//						}
//					}
//				}
//				break;
//			}
//	 	}

  	}; 

	// Función para inscribir alumnos
	$scope.studentsRecord = function(){
		$http.get("http://localhost:3000/coursesp/" + $rootScope.padron).success(function (response) {
		var dataObj = {
			student : response[0]._id,
		};	

		$http.put("http://localhost:3000/course/"+ $scope.searchCourse._id + "/students",dataObj).success(function(data, status, headers, config) {
		         // this isn't happening:
		        alert("aaaa");
		    }).error(function(data, status, headers, config) {
		         // this isn't happening:
		     alert('vcvcvc');
		    });
	});

//		$http.put("http://localhost:3000/course/"+ $scope.searchCourse._id + "/students",dataObj).success(function(data, status, headers, config) {
		         // this isn't happening:
//		        alert("aaaa");
//		    }).error(function(data, status, headers, config) {
		         // this isn't happening:
//		     alert('vcvcvc');
//		    });

//		var url="http://localhost:3000/coursesp/" + $rootScope.padron;
//		$http.get(url).success(function (response) {
//
//			var dataObj = {
//				course : $scope.searchCourse.name,
//				student : response[0]._id,
//			};	
//	
//			$http.post("http://localhost:3000/" + response[0]._id +"/student", dataObj).success($scope.recordMessage="Registro exitoso").error($scope.recordMessage="Error");
//		});
	};
})
