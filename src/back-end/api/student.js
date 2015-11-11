"use strict";

var Student = require('../models/student.js');

exports.login = function(req, res, next) {
  Student.findOne({record: req.body.record}, function(err, student) {
    if (!student)
      res.send({status: 'error'}, 401);
    res.send(student);
  });
};
