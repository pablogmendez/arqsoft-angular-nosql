"use strict";

var Course = require('../models/course.js'),
    Student = require('../models/student.js'),
    ObjectId = require('mongoose').Types.ObjectId;

exports.findByTerm = function(req, res, next) {
  Course.find({year: req.params.year, term: req.params.term}, function(err, courses) {
    if (err) {
      res.send({status: error, message: err}, 500);
    }
    res.send(courses);
  });
};

exports.findById = function(req, res, next) {
  Course.findById(req.params.id, function(err, course) {
    Student.find({
      '_id': { $in: course.students}
    }, function(err, students) {
      if (err)
        return next(err);
      res.send({course: course, students: students});
    });
  });
};

exports.addNewStudent = function(req, res, next) {
  Course.findById(req.params.id, function(err, course) {
    if (err)
      next(err);
    course.update({$push: {students: new ObjectId(req.body.student)}}, function(err) {
      if (err)
        next(err);
      res.send();
    });
  });
};

exports.getAll = function(req, res, next) {
  Course.find(function(err, courses) {
    if (err) {
      console.log(err);
      res.send({status: error, message: err}, 500);
    }
    res.send(courses);
  });
};
