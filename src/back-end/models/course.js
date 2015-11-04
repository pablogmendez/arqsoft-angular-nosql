'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var courseSchema = new Schema({
  name: {type: String},
  year: {type: Number},
  term: {type: Number},
  students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Students' }]
});

courseSchema.index({ name: 1 });

module.exports = mongoose.model('Course', courseSchema);
