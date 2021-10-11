import React, { useContext, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import CourseContext from '../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import { Link } from 'react-router-dom';
import CourseCard from '../components/Courses/CourseCard';
import { BsFillGearFill } from 'react-icons/bs';

const UserHome = (props) => {
	const authContext = useContext(AuthContext);
	const courseContext = useContext(CourseContext);

	const { getCoursesByTutor, courses, course, setCourses } = courseContext;
	const { user, loading } = authContext;

	useEffect(() => {
		if (user !== null) getCoursesByTutor(user._id);
	}, []);

	const renderBadge = () => {
		if (user.userType == 3) {
			return <span className='badge bg-warning'>Admin</span>;
		} else if (user.userType == 2) {
			return <span className='badge bg-success'>Tutor</span>;
		} else {
			return;
		}
	};

	const renderTutorSection = () => {
		if (user.userType == 3) {
			return (
				<div id='user-home-tutors'>
					<h2>Manage Tutors</h2>
				</div>
			);
		} else if (user.userType == 2) {
			return (
				<div id='user-home-tutors'>
					<h2>Current Students</h2>
				</div>
			);
		} else {
			return (
				<div id='user-home-tutors'>
					<h2>Current Tutors</h2>
				</div>
			);
		}
	};

	const renderCourseSection = () => {
		if (user.userType == 3) {
			return (
				<div id='user-home-courses'>
					<div className='flex-row'>
						<h2>Manage Courses</h2>
						<Link to='/createcourse'>
							<Button variant='dark'>Add </Button>
						</Link>
					</div>
					<hr />
				</div>
			);
		} else if (user.userType == 2) {
			return (
				<div id='user-home-courses'>
					<div className='flex-row'>
						<h2>Tutoring Courses</h2>
						<Link to='/courses'>
							<Button variant='dark'>Add</Button>
						</Link>
					</div>
					<div className='recipe-card-container'>
						{courses !== null && !loading ? (
							courses.map((course) => <CourseCard courseContent={course} />)
						) : (
							<LinearProgress />
						)}
					</div>
				</div>
			);
		} else {
			return (
				<div id='user-home-courses'>
					<div className='flex-row'>
						<h2>Current Courses</h2>
						<Link to='/courses'>
							<Button variant='dark'>Add</Button>
						</Link>
					</div>
					<hr />
				</div>
			);
		}
	};

	return (
		<div>
			{user !== null && !loading ? (
				<div>
					<div id='user-home-topbar'>
						<div className='flex-row'>
							<h1>
								{user.fname} {user.lname}{' '}
							</h1>
						</div>

						<div className='flex-row'>
							<Link to='/settings'>
								<Button variant='dark'>Settings</Button>
							</Link>
						</div>
					</div>
					<h1>{renderBadge()}</h1>
					<hr />
					{renderTutorSection()}
					<hr />
					{renderCourseSection()}
				</div>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};

export default UserHome;
