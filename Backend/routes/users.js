const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');


// @route GET api/users
// Get users

router.get('/',async (req, res, next) => {
	try{
		const users = await User.find();
		res.json(users);
	} catch (error){
		console.log(error)
		res.status(500).send('Server Error')
	}

});

// @route GET api/users/:id
// Get user by id

router.get('/id/:id',async (req, res, next) => {
	try{
		const user = await User.findOne({_id: req.params.id});
		res.json(user);
	} catch (error){
		console.log(error)
		res.status(500).send('Server Error')
	}

});

// @route GET api/users/tutors
// Get Tutors

router.get('/tutors',async (req, res, next) => {
	try{
		const users = await User.find({userType: '2'}).exec();
		res.json(users);
	} catch (error){
		console.log(error)
		res.status(500).send('Server Error')
	}
});

// @route POST api/users
// Create a user
// Public

// Express validation wihin the params of the router
router.post(
	'/',
	[
		check('email', 'Please include a valid email').isEmail(),
		check(
			'password',
			'Please enter a password with 6 or more characters'
		).isLength({min: 6}),
		check(
			'phonenum',
			'Please enter a valid phone number'
		).isLength({min: 10})
	],
	async (req, res, next) => {
		const errors = validationResult(req);

		// Return the errors if invalid format.
		if (!errors.isEmpty()) {
			return res.status(400).json({errors: errors.array()});
		}

		// Extract the actual data from the body
		const {email, password, fname, lname, phonenum, userType} = req.body;

		// Check and see if user already exists in the database
		try {
			// Mongoose checks in DB
			let user = await User.findOne({email: email});

			// If user found send a bad req back with small message
			if (user) {
				res.status(400).json({msg: 'User already exists'});
			}

			user = await User.findOne({phonenum: phonenum});
			// If user found send a bad req back with small message
			if (user) {
				res.status(400).json({msg: 'User already exists'});
			}

			// Creating a new User
			user = new User({
				email,
				password,
				fname,
				lname,
				phonenum,
				userType
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000
				},
				(err, token) => {
					if (err) throw err;
					res.json({token});
				}
			);
		} catch (error) {
			console.error(error.message);
			res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
