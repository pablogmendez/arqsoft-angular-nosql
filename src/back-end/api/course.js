"use strict";

var Course = require('../models/course.js'),
    Student = require('../models/student.js');

exports.findByTerm = function(req, res, next) {
  Course.find({year: req.params.year, term: req.params.term}, function(err, courses) {
    if (err) {
       console.log(err);
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

      next(null, {course: course, students: students});
    });
  });
};

exports.addNewCourse = function(req, res, next) {
  var course = new Course({
    name: req.body.name,
    year: req.body.year,
    term: req.body.term,
    students: req.body.students || []
  });

  course.save(function(err) {
    if (err) {
      res.send({status: error, message: err}, 500);
    }
  });

  res.send(course);
};
