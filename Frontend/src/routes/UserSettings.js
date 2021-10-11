import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import CourseContext from '../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import CourseCard from '../components/Courses/CourseCard';
import { BsFillGearFill } from 'react-icons/bs';

const UserSettings = (props) => {
	const authContext = useContext(AuthContext);
	const courseContext = useContext(CourseContext);

	const { getCoursesByTutor, courses, course, setCourses } = courseContext;
	const { user, loading, isAuthenticated } = authContext;

	useEffect(() => {
		if (user !== null) getCoursesByTutor(user._id);
	}, []);

	return (
		<div>
			{user !== null && isAuthenticated ? (
				<div>
					<h1>Settings</h1>
					<hr />
					<div className='flex-row settings-container'>
						<div className='settings-sidebar d-grid gap-2'>
							<Button variant='secondary' size='lg'>
								Change Password
							</Button>
							<Button variant='secondary' size='lg'>
								Change Email
							</Button>
							<Button variant='secondary' size='lg'>
								Change Major
							</Button>
							<Button variant='secondary' size='lg'>
								Delete Account
							</Button>
						</div>
						<div className='settings-content'>
							{' '}
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error id sint blanditiis, ab
							distinctio totam impedit perspiciatis ut cum quia laboriosam dolore cumque. Consequuntur
							reprehenderit id magnam ipsam, iusto nihil.
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
