import React, { useContext, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import CreateCourse from '../components/Courses/NewCourseForm'

const Courses = (props) => {

	const authContext = useContext(AuthContext);

	const {user, loading, isAuthenticated} = authContext;

	useEffect(() => {
		authContext.loadUser();
	}, []);

	if (isAuthenticated && user.userType === 3)
	return (
		<div>
			<h1 className="display-1">Create A Course</h1>
			<CreateCourse />
		</div>
	);
}

export default Courses;