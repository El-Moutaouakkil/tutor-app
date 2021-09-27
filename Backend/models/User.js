const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	fname: {
		type: String,
		required: true
	},
	lname: {
		type: String,
		required: true
	},
	userType:{
		type: Number,
		required: true
	},
	phonenum: {
		type: Number,
		unique: true
	},
	courses: {
		type: [ {course: String, semester: String} ]
	},
	tutors: {
		type: [ {email: String} ]
	},

	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('users', UserSchema);
