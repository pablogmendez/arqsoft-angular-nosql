"use strict";

exports.addNewStudent = function(req, res, next) {
  var student = new Student({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    age: req.body.age,
    phone: req.body.phone
  });

  student.save(function(err) {
    if (err) {
      res.send({status: error, message: err}, 500);
    }
  });

  res.send(student);
};
