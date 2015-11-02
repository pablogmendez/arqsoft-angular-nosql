"use strict";

var Course = require('../models/course.js'),
    Student = require('../models/student.js');

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
  Course.findById(req.body.course, function(err, course) {
    if (err)
      next(err);
    course.update({$push: {students: req.body.student}}, function(err) {
      if (err)
        next(err);
    });
  });
};

exports.getAll = function(req, res, next) {
  Course.aggregate([
      {$group: {_id: {year: '$year', term: '$term'}}},
      {$project: {year: '$_id.year', term: '$_id.term', _id: 0}}
    ], function (err, results) {
      if (err) {
        next(err);
      }
      res.send(results);
    }
  );
};
