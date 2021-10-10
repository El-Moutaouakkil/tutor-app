import React, { useContext, useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import CourseContext from '../context/course-context/CourseContext';
import AuthContext from '../context/auth-context/AuthContext';
import UserContext from '../context/user-context/UserContext';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '../components/Alert';
import AlertContext from '../context/alert-context/AlertContext';
import TutorCard from '../components/Tutors/TutorCard';

const CourseHome = (props) => {
	// TODO implement alerts

	const courseContext = useContext(CourseContext);
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const userContext = useContext(UserContext);

	const { users, getTutorsByCourse } = userContext;
	const { getOneCourse, course, loading, teachCourse, takeCourse } = courseContext;
	const { user, isAuthenticated } = authContext;
	const { setAlert } = alertContext;

	const params = useParams();

	const [show, setShow] = useState(false);

	const handleClose = () => {
		setShow(false);
	};

	const handleShow = () => setShow(true);

	const handleTeachCourse = () => {
		setShow(false);
		const res = teachCourse({ courseid: course.courseid, tutorid: user._id });
		console.log(res);
	};

	useEffect(() => {
		getOneCourse(params.id);
		if (course !== null) getTutorsByCourse(course.courseid);
	}, []);

	const renderTeachButton = () => {
		if (isAuthenticated) {
			if (user.userType == 3) {
				return <Button>Edit</Button>;
			} else if (user.userType == 2) {
				return <Button onClick={handleShow}>Teach</Button>;
			}
		} else {
			return;
		}
	};

	return (
		<div>
			{course !== null && !loading ? (
				<div>
					<div id='user-home-topbar'>
						<h1>{course.name} </h1>
						<div>
							<h1>
								<span className='badge bg-dark'>{course.courseid}</span>
							</h1>
							<h1>{renderTeachButton()}</h1>
						</div>
					</div>
					<hr />
					<div>
						<p>{course.description}</p>
					</div>
					<hr />
					<h2>Tutors Available</h2>
					<div className='recipe-card-container'>
						{users !== [] && !loading ? (
							users.map((user) => <TutorCard tutorContent={user} />)
						) : (
							<LinearProgress />
						)}
					</div>
				</div>
			) : (
				<LinearProgress />
			)}

			{!loading && isAuthenticated ? (
				<Modal show={show} onHide={handleClose}>
					<Modal.Header>
						<Modal.Title>Confirmation</Modal.Title>
					</Modal.Header>
					<Modal.Body>Ready to teach {course.name}?</Modal.Body>
					<Modal.Footer>
						<Button variant='secondary' onClick={handleClose}>
							No
						</Button>
						<Button variant='primary' onClick={handleTeachCourse}>
							Yes!
						</Button>
					</Modal.Footer>
				</Modal>
			) : (
				<LinearProgress />
			)}
		</div>
	);
};

export default CourseHome;
