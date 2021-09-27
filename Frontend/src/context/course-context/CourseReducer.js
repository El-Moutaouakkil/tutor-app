import {
	GET_ONE_COURSE,
    GET_COURSES,
    GET_COURSES_BY_MAJOR,
    CREATE_COURSE,
    DELETE_COURSE,
    CONTACT_ERROR,
	CLEAR_ERRORS
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
		case CLEAR_ERRORS:
		case CONTACT_ERROR:
			return {
				...state,
				error: null
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
