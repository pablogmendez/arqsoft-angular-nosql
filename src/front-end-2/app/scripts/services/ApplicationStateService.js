'use strict';

angular.module('yapp')
  .service('ApplicationStateService', function () {
    var
        terms = [],
        years = [],
        courses = [],
        student = {},
        serverUrl = 'http://localhost:3000';

    function setCourses(newCourses) {
    	courses = newCourses;
    }

    function getCourses() {
    	return courses;
    }

    function setStudent(newStudent) {
    	student = newStudent;
    }

    function getStudent() {
    	return student;
    }

    function setTerms(newTerms) {
        terms = newTerms;
    }

    function getTerms() {
        return terms;
    }

    function setYears(newYears) {
        years = newYears;
    }

    function getYears() {
        return years;
    }

    return {
        setTerms: setTerms,
        getTerms: getTerms,
        setYears: setYears,
        getYears: getYears,
    	setStudent: setStudent,
    	getStudent: getStudent,
        setCourses: setCourses,
        getCourses: getCourses,
        serverUrl: serverUrl
    };
  });
