"use strict";

var Course = require('../models/course.js'),
    Student = require('../models/student.js'),
    mongoose = require('mongoose');

exports.findByTerm = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  Course.find({year: req.params.year, term: req.params.term}, function(err, courses) {
    if (err) {
      res.send({status: error, message: err}, 500);
    }
    res.send(courses);
  });
};

exports.findById = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
//$http.defaults.headers.common['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';
//$http.defaults.headers.common['Access-Control-Allow-Headers'] = 'Origin, X-Request-With, Content-Type, Accept';
//res.setHeader("Access-Control-Allow-Origin", "*");
//  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
console.log(req.body.student);
 Course.findById(req.params.id, function(err, course) {
console.log(course);
   if (err)
     next(err);
   Course.update({_id:course}, {$push: {students: new mongoose.Types.ObjectId(req.body.student)}}, function(err) {
     if (err)
       next(err);
      res.send();
    });
  });
};

exports.getAll = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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

exports.getCourses = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  Course.find(function(err, courses) {
    if (err) {
       console.log(err);
       res.send({status: error, message: err}, 500);
    }
    res.send(courses);
  });
};

exports.getAllYears = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  Course.aggregate([
      {$group: {_id: {year: '$year'}}},
      {$project: {year: '$_id.year', _id: 0}}
    ], function (err, results) {
      if (err) {
        next(err);
      }
      res.send(results);
    }
  );
};

exports.findByPadron = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  Student.find({padron: req.params.padron}, function(err, student) {
    if (err) {
      res.send({status: error, message: err}, 500);
    }
    res.send(student);
  });
};
