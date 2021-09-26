import React, { useState, useContext, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import { useHistory } from 'react-router-dom';
import Alert from '../components/Alert';
import AlertContext from '../context/alert-context/AlertContext';

const SignUpFields = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);

	const { setAlert } = alertContext;

	let history = useHistory();

	const [ user, setUser ] = useState({
		email: '',
		password: '',
		confirmPassword: '',
		fname: '',
		lname: '',
		phonenum: '',
		isTutor: 'false'
	});

	const { email, password, confirmPassword, fname, lname, phonenum, isTutor } = user;
	const { register, error, isAuthenticated } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				history.push('/userhome');
			}

			if (error === 'User already exists') {
			}
		},
		[ error, isAuthenticated, props.history ]
	);

	const handleChange = (event) => {
		event.persist();
		setUser((user) => ({
			...user,
			[event.target.id]: event.target.value
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (email === '' || password === '' || fname === '' || lname === '' || phonenum === '') {
			setAlert('Please enter all fields', 'danger');
		} else if (password !== confirmPassword) {
			setAlert('Passwords do not match', 'danger');
		} else {
			console.log(isTutor)
			register({ email, password, fname, lname, phonenum, isTutor });
		}
	};
	return (
		<div>
			<div id='sign-up-form'>
				<Form onSubmit={handleSubmit}>
					<Form.Group controlId='email' className='form-group'>
						<Form.Label>Email address</Form.Label>
						<Form.Control
							type='email'
							placeholder='roary@fiu.edu'
							value={user.email}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId='fname' className='form-group'>
						<Form.Label>First Name</Form.Label>
						<Form.Control
							placeholder='Tom'
							value={user.fname}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId='lname' className='form-group'>
						<Form.Label>Last Name</Form.Label>
						<Form.Control
							placeholder='Ford'
							value={user.lname}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId='phonenum' className='form-group'>
						<Form.Label>Phone Number</Form.Label>
						<Form.Control
							placeholder='7862418690'
							value={user.phonenum}
							onChange={handleChange}
							required
						/>
					</Form.Group>

					<Form.Group controlId='password' className='form-group'>
						<Form.Label>Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Password'
							required
							value={user.password}
							onChange={handleChange}
							pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
							title='Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
						/>
					</Form.Group>

					<Form.Group controlId='confirmPassword' className='form-group'>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type='password'
							placeholder='Confirm password'
							required
							value={user.confirmPassword}
							onChange={handleChange}
						/>
					</Form.Group>

					<Button variant='outline-dark' type='submit'>
						Submit
					</Button>
					<Alert />
				</Form>
			</div>
		</div>
	);
};

export default SignUpFields;
