import React, {useContext, useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CourseContext from '../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import {Link} from 'react-router-dom';


const CourseHome = (props) => {

	const courseContext = useContext(CourseContext);
	const { getOneCourse, course, loading } = courseContext;

    const params = useParams()

	useEffect(() => {
		getOneCourse(params.id);
	}, []);

	
	//   const renderBadge = () => {
	// 	if(user.userType == 3){
	// 		return <span className="badge bg-warning">Admin</span>;
	// 	}
	// 	else if (user.userType == 2) {
	// 		return <span className="badge bg-success">Tutor</span>;
	// 	} 
	// 	else {
	// 		return;
	// 	}
    // }

	return (
		<div>
			{course !== null && !loading ? (
				<div>
					<div id="user-home-topbar">
						<h1>{course.name} {course.courseid} </h1> 
					</div>
					<hr />
				</div>
            ): (
				<LinearProgress />
			)}
		</div>
	);
}

export default CourseHome;
