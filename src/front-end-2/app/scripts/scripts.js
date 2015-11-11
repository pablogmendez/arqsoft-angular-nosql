"use strict";

// Router
angular.module("yapp", ["ui.router", "ngAnimate"])
.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider,$urlRouterProvider) {
	$urlRouterProvider.when("/dashboard", "/dashboard/overview"),
	$urlRouterProvider.otherwise("/login"),
	$stateProvider
		.state("base", {
			"abstract":!0,
			url:"",
			templateUrl:"views/base.html"
		})
		.state("login", {
			url:"/login",
			parent:"base",
			templateUrl:"views/login.html",
			controller:"LoginCtrl"
		})
		.state("dashboard", {
			url:"/dashboard",
			parent:"base",
			templateUrl:"views/dashboard.html",
			controller:"DashboardCtrl"
		})
		.state("registrations", {
			url:"/registrations",
			parent:"dashboard",
			templateUrl:"views/dashboard/registrations.html",
			controller:"ResultsCtrl",
		})
		.state("reports", {
			url:"/reports",
			parent:"dashboard",
			templateUrl:"views/dashboard/reports.html",
			controller:"ResultsCtrl",
		})
		.state("overview", {
			url:"/overview",
			parent:"dashboard",
			templateUrl:"views/dashboard/overview.html",
			resolve: {
				loadCourses: ResultsCtrl.loadCourses
			}
		})
}]);
