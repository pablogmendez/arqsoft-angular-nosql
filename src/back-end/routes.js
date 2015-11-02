'use strict';

exports = module.exports = function(app) {
	app.get('/courses', require('./api/course').getAll);
	app.get('/courses/:id', require('./api/course').findById);
	app.get('/courses/:year/:term', require('./api/course').findByTerm);
	app.put('/course/:id/student', require('./api/course').addNewStudent);
};
