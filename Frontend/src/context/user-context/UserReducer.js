import {
    GET_ONE_USER,
    DELETE_USER,
    GET_USERS,
    CONTACT_ERROR,
    CLEAR_ERRORS,
} from "../types";

const userReducer = (state, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        case CLEAR_ERRORS:
        case CONTACT_ERROR:
            return {
                ...state,
                error: null,
            };
        case GET_ONE_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
export default userReducer;
