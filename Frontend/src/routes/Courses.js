import React, { useContext, useEffect, useRef } from 'react';
import CourseContext from '../context/course-context/CourseContext';
import LinearProgress from '@mui/material/LinearProgress';
import CourseCard from '../components/Courses/CourseCard';

const Courses = (props) => {

	const courseContext = useContext(CourseContext);

	const { getCourses, courses, loading } = courseContext;

	useEffect(() => {
		getCourses();
	}, []);

	return (
		<div>
			<h1 className="display-1">Courses</h1>
			<form>
					<input
						type='text'
						placeholder='Find Courses...'
						className='form-control search-field'
					/>
			</form>
			<br />
			<div className='recipe-card-container'>
				{courses !== [] && !loading ? (
					courses.map((course) => (
						<CourseCard courseContent={course} />
					))
				) : (
					<LinearProgress />
				)}
			</div>
		</div>
	);
}

export default Courses;