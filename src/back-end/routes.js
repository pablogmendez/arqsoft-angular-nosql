'use strict';

exports = module.exports = function(app) {
	app.get('/courses', require('./api/course').getAll);
	app.get('/coursesa', require('./api/course').getCourses);
	app.get('/coursesy', require('./api/course').getAllYears);
	app.get('/courses/:id', require('./api/course').findById);
	app.get('/coursesp/:padron', require('./api/course').findByPadron);
	app.get('/courses/:year/:term', require('./api/course').findByTerm);
	app.put('/course/:id/student', require('./api/course').addNewStudent);
};
