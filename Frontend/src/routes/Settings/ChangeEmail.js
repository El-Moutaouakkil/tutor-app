import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../../context/auth-context/AuthContext';
import CourseContext from '../../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';

const UserSettings = (props) => {
	const authContext = useContext(AuthContext);
	const courseContext = useContext(CourseContext);

	const { getCoursesByTutor, courses, course, setCourses } = courseContext;
	const { user, loading, isAuthenticated } = authContext;

	useEffect(() => {}, []);

	return (
		<div>
			{user !== null && isAuthenticated ? (
				<div>
					<h1>Settings</h1>
					<hr />
					<div className='flex-row settings-container'>
						<div className='settings-sidebar d-grid gap-2'>
							<Link to='/changepwd'>
								<Button variant='secondary' size='lg'>
									Change Password
								</Button>
							</Link>
							<Link to='changeemail'>
								<Button variant='secondary' size='lg'>
									Change Email
								</Button>
							</Link>
							<Link to='changemajor'>
								<Button variant='secondary' size='lg'>
									Change Major
								</Button>
							</Link>

							<Button variant='secondary' size='lg'>
								Delete Account
							</Button>
						</div>
						<div className='settings-content'>
							<h2>Change Email</h2>
						</div>
					</div>
				</div>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};

export default UserSettings;
