var express = require('express');
var router = express.Router();

const Course = require('../models/Course');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');

// @route GET api/course
// Get all courses
// Public

router.get('/', async (req, res, next) => {
	try {
		const courses = await Course.find();
		res.json(courses);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/course
// Get a course
// Public

router.get('/id/:id', async (req, res, next) => {
	try {
		const course = await Course.findOne({ _id: req.params.id });
		res.json(course);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route GET api/course
// Get users course
// Public

router.get('/user/:id', async (req, res, next) => {
	try {
		const course = await Course.find({ user: req.params.id });
		res.json(course);
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route POST api/course
// Create a course
// Private
// @ts-ignore
router.post(
	'/',
	auth,
	[
		[
			check('name', 'Name is required').not().isEmpty(),
			check('courseid', 'courseid is required').not().isEmpty(),
			check('description', 'description is required').not().isEmpty(),
			check('majors', 'majors are required').not().isEmpty()
		]
	],
	async (req, res, next) => {
		const errors = validationResult(req);
		// Return the errors if invalid format.
		console.log(errors);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, courseid, description, majors, tutors } = req.body;
		try {
			const newCourse = new Course({
				name,
				courseid,
				description,
				majors,
				tutors
			});

			const course = await newCourse.save();
			res.json(course);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route PUT api/course/teach
// Teach a course
// Private
// @ts-ignore
router.post(
	'/teach',
	auth,
	[[check('courseid', 'course is required').not().isEmpty(), check('tutorid', 'tutor is required').not().isEmpty()]],
	async (req, res, next) => {
		const errors = validationResult(req);
		// Return the errors if invalid format.
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { courseid, tutorid } = req.body;
		console.log(req.body);
		try {
			let tutor = await User.findById(tutorid);
			if (!tutor) return res.status(404).json({ msg: 'User not found' });
			console.log(tutor);
			tutor = await User.findByIdAndUpdate(tutorid, { $push: { coursesTeaching: courseid } }, { new: true });
			res.json(tutor);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

// @route DELETE api/course
// Delete a Course
// Private

router.delete('/:id', auth, async (req, res, next) => {
	try {
		let course = await Course.findById(req.params.id);
		if (!course) return res.status(404).json({ msg: 'Contact not found' });

		// Make sure user owns course
		if (course.author.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'Unauthorized' });
		}

		course = await Course.findByIdAndRemove(req.params.id);

		res.json({ msg: 'Contact Removed' });
	} catch (error) {
		console.error(error.message);
		res.status(500).send('Server Error');
	}
});

// @route PUT api/course/:id
// Update a Course
// Private
// @ts-ignore
router.put(
	'/:id',
	[
		auth,
		[
			check('name', 'Name is required').not().isEmpty(),
			check('courseid', 'courseid is required').not().isEmpty(),
			check('description', 'description is required').not().isEmpty(),
			check('majors', 'majors are required').not().isEmpty()
		]
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		// Return the errors if invalid format.
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, courseid, description, preptime, difficulty } = req.body;

		const courseFields = {};
		if (name) courseFields.name = name;
		if (courseid) courseFields.courseid = courseid;
		if (description) courseFields.description = description;
		if (majors) courseFields.majors = majors;

		try {
			let course = await Course.findById(req.params.id);
			if (!course) return res.status(404).json({ msg: 'Contact not found' });

			// // Make sure user owns course
			// if (course.author.toString() !== req.user.id) {
			// 	return res.status(401).json({msg: 'Unauthorized'});
			// }

			course = await Course.findByIdAndUpdate(req.params.id, { $set: courseFields }, { new: true });

			res.json(course);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
