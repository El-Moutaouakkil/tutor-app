import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/user-context/UserContext';
import CourseContext from '../context/course-context/CourseContext';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import CourseCard from '../components/Courses/CourseCard';
import LinearProgress from '@mui/material/LinearProgress';
import { BsFillEnvelopeFill } from 'react-icons/bs';
import { AiOutlinePhone } from 'react-icons/ai';

const TutorProfile = (props) => {
	const userContext = useContext(UserContext);
	const courseContext = useContext(CourseContext);
	const { user, getOneUser, loading } = userContext;
	const { getCoursesByTutor, course, courses, setCourses } = courseContext;

	const params = useParams();

	useEffect(() => {
		getOneUser(params.id).then(getCoursesByTutor(params.id));
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

	// const getCoursesById = () => {
	// 	let tempCourses = [];
	// 	user.coursesTeaching.forEach((courseid) => {
	// 		getCourseById(courseid);
	// 		tempCourses.push(course);
	// 	});
	// 	setCourses(tempCourses);
	// };

	return (
		<div>
			{user !== null && !loading ? (
				<div>
					<div id='user-home-topbar'>
						<h1>
							{user.fname} {user.lname} {renderBadge()}``
						</h1>
						<div id='profile-contact'>
							<div className='d-flex flex-row align-items-center'>
								<BsFillEnvelopeFill />
								<p>&nbsp; {user.email}</p>
							</div>
							<div className='d-flex flex-row align-items-center'>
								<AiOutlinePhone />
								<p>&nbsp; {user.phonenum}</p>
							</div>
						</div>
					</div>
					<hr />
					<div id='tutor-home-courses'>
						<h2>Teaching Courses</h2>
						<hr />
						<div className='recipe-card-container'>
							{courses !== null && !loading ? (
								courses.map((course) => <CourseCard courseContent={course} />)
							) : (
								<LinearProgress />
							)}
						</div>
					</div>
				</div>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};

export default TutorProfile;
