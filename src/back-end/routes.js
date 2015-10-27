'use strict';

exports = module.exports = function(app) {
	//app.get('/students/:id', require('./api/student').findById);
	app.get('/courses/:year/:term', require('./api/course').findByTerm);
	app.get('/courses/:id', require('./api/course').findById);
	app.post('/course', require('./api/course').addNewCourse);
	app.post('/student', require('./api/student').addNewStudent);
};
