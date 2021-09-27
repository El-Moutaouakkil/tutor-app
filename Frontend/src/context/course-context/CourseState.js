import React, {useReducer} from 'react';
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
	CLEAR_ERRORS
} from '../types';

const CourseState = props => {
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

    const getCourse = async () => {
		try {
			const res = await axios.get('/api/courses');
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
			const res = await axios.get('/api/courses/major' + id);
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

	// Clear Errors
	const clearErrors = () => dispatch({type: CLEAR_ERRORS});

	return (
		<CourseContext.Provider
			value={{
				loading: state.loading,
				user: state.user,
				error: state.error,
                users: state.users,
                filtered: state.filtered,
				clearErrors,
                deleteCourse,
                getCourse,
				getCourseByMajor,
				getOneCourse
			}}
		>
			{props.children}
		</CourseContext.Provider>
	);
};

export default CourseState;
