'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var studentSchema = new Schema({
  firstName: {type: String},
  lastName: {type: String},
  age: {type: Number},
  phone: {type: String}
});

studentSchema.index({ name: 1 });

module.exports = mongoose.model('Student', studentSchema);
