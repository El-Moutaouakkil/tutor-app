import React, { useReducer } from 'react';
import axios from 'axios';

import CourseReducer from './CourseReducer';
import CourseContext from './CourseContext';

import {
	GET_ONE_COURSE,
	GET_COURSES,
	GET_COURSES_BY_MAJOR,
	CREATE_COURSE,
	DELETE_COURSE,
	CONTACT_ERROR,
	TAKE_COURSE,
	TEACH_COURSE,
	CLEAR_ERRORS
} from '../types';

const CourseState = (props) => {
	const InitialState = {
		loading: true,
		courses: [],
		course: null,
		filtered: null,
		error: null
	};

	const [state, dispatch] = useReducer(CourseReducer, InitialState);

	const deleteCourse = (id) => {
		dispatch({ type: DELETE_COURSE, payload: id });
	};

	const getCourses = async () => {
		try {
			const res = await axios.get('/api/course');
			dispatch({
				type: GET_COURSES,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err
			});
		}
	};

	const getCourseByMajor = async (id) => {
		try {
			const res = await axios.get('/api/course/major' + id);
			dispatch({
				type: GET_COURSES_BY_MAJOR,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err
			});
		}
	};

	const getOneCourse = async (id) => {
		try {
			const res = await axios.get('/api/course/id/' + id);
			dispatch({
				type: GET_ONE_COURSE,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};

	// Add Course
	const addCourse = async (course) => {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		try {
			const res = await axios.post('/api/course', course, config);

			dispatch({ type: CREATE_COURSE, payload: res });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Add Course
	const teachCourse = async (formData) => {
		try {
			const res = await axios.post('/api/course/teach', formData);

			dispatch({ type: TEACH_COURSE, payload: res });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Add Course
	const takeCourse = async (formData) => {
		try {
			const res = await axios.post('/api/course/take', formData);

			dispatch({ type: TAKE_COURSE, payload: res });
		} catch (error) {
			dispatch({ type: CONTACT_ERROR, payload: error.response.msg });
		}
	};

	// Clear Errors
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<CourseContext.Provider
			value={{
				loading: state.loading,
				course: state.course,
				error: state.error,
				courses: state.courses,
				filtered: state.filtered,
				clearErrors,
				deleteCourse,
				getCourses,
				getCourseByMajor,
				getOneCourse,
				teachCourse,
				takeCourse,
				addCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
