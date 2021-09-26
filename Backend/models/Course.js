const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	courseid: {
		type: String,
		required: true,
        unique: true
	},
	description: {
		type: String,
		required: true
	},
	majors: {
		type: [ {major: String} ]
	},
	tutors: {
		type: [ {email: String} ]
	}
});

module.exports = mongoose.model('courses', CourseSchema);
