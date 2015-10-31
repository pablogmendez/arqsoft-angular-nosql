"use strict";

angular.module("yapp",["ui.router","ngAnimate"])
.config(["$stateProvider","$urlRouterProvider",function(r,t){t.when("/dashboard","/dashboard/overview"),t.otherwise("/login"),r.state("base",{"abstract":!0,url:"",templateUrl:"views/base.html"})
.state("login",{url:"/login",parent:"base",templateUrl:"views/login.html",controller:"LoginCtrl"})
.state("dashboard",{url:"/dashboard",parent:"base",templateUrl:"views/dashboard.html",controller:"DashboardCtrl"})
.state("overview",{url:"/overview",parent:"dashboard",templateUrl:"views/dashboard/overview.html"})
.state("results",{url:"/results",parent:"dashboard",templateUrl:"views/dashboard/results.html"})
.state("registrations",{url:"/registrations",parent:"dashboard",templateUrl:"views/dashboard/registrations.html"})
.state("reports",{url:"/reports",parent:"dashboard",templateUrl:"views/dashboard/reports.html"})}]),

angular.module("yapp")
.controller("LoginCtrl",["$scope","$location",function(r,t){r.submit=function(){return t.path("/dashboard"),!1}}]),
angular.module("yapp").controller("DashboardCtrl",["$scope","$state",function(r,t){r.$state=t}])

.controller('ResultsCtrl', function($scope, $http) {
    $http.get("http://www.w3schools.com/angular/customers.php")
    .success(function (response) {$scope.names = response.records;});
})


.controller('AnioCtrl', ['$scope', function($scope) {
   $scope.data = {
    repeatSelect: null,
    availableOptions: [
      {id: '1', name: '2005'},
      {id: '2', name: '2006'},
      {id: '3', name: '2007'},
      {id: '4', name: '2008'},
      {id: '5', name: '2009'},
      {id: '6', name: '2010'},
      {id: '7', name: '2011'},
      {id: '8', name: '2012'},
      {id: '9', name: '2013'},
      {id: '10', name: '2014'},
      {id: '10', name: '2015'},
    ],
   };
}])

.controller('CuatriCtrl', ['$scope', function($scope) {
   $scope.data = {
    repeatSelect: null,
    availableOptions: [
      {id: '1', name: '1° Cuat.'},
      {id: '2', name: '2° Cuat.'},
      {id: '3', name: 'Curso de verano'},
    ],
   };
}])

.controller('MateriaCtrl', ['$scope', function($scope) {
   $scope.data = {
    repeatSelect: null,
    availableOptions: [
      {id: '1', name: '61.03. Análisis Matemático II A'},
      {id: '2', name: '61.06. Probabilidad y Estadística A'},
      {id: '3', name: '61.19. Análisis Funcional'},
      {id: '4', name: '75.02. Algoritmos y Programación I'},
      {id: '5', name: '75.14. Lenguajes Formales'},
    ],
   };
}]);
