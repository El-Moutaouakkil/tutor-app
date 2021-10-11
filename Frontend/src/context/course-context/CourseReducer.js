import {
	GET_ONE_COURSE,
	GET_COURSES,
	GET_COURSES_BY_MAJOR,
	CREATE_COURSE,
	DELETE_COURSE,
	TAKE_COURSE,
	TEACH_COURSE,
	CONTACT_ERROR,
	CLEAR_ERRORS,
	CLEAR_COURSES,
	SET_COURSES
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_COURSES:
		case GET_COURSES_BY_MAJOR:
			return {
				...state,
				courses: action.payload,
				loading: false
			};
		case SET_COURSES:
			return {
				...state,
				courses: action.payload
			};
		case CLEAR_ERRORS:
		case CONTACT_ERROR:
			return {
				...state,
				error: null
			};
		case TAKE_COURSE:
		case TEACH_COURSE:
			return {
				...state,
				loading: false
			};
		case GET_ONE_COURSE:
			return {
				...state,
				course: action.payload,
				loading: false
			};
		default:
			return state;
	}
};
