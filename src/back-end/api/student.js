"use strict";

exports.addNewStudent = function(req, res, next) {
res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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
