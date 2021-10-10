import React, {useContext, useState, useEffect} from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CourseContext from '../context/course-context/CourseContext';
import AuthContext from '../context/auth-context/AuthContext';
import LinearProgress from '@mui/material/LinearProgress';
import {Link} from 'react-router-dom';


const CourseHome = (props) => {

	const courseContext = useContext(CourseContext);
	const authContext = useContext(AuthContext);

	const { getOneCourse, course, loading } = courseContext;
	const {user} = authContext;

    const params = useParams()

	useEffect(() => {
		authContext.loadUser();
		getOneCourse(params.id);
	}, []);

	
	  const renderTeachButton = () => {
		if(user.userType == 2){
			return <Button>Teach this Course!</Button>;
		}
		else {
			return;
		}
    }

	return (
		<div>
			{course !== null && !loading ? (
				<div>
					<div id="user-home-topbar">
						<h1>{course.name}  </h1>
						<div>
							<h1><span className="badge bg-primary">{course.courseid}</span></h1>
							<h1>{renderTeachButton()}</h1>
						</div>
					</div>
					<hr />
					<div>
						<p>{course.description}</p>
					</div>
					<hr />
					<h2>Tutors Available</h2>
				</div>
            ): (
				<LinearProgress />
			)}
		</div>
	);
}

export default CourseHome;
