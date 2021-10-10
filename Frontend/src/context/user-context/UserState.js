import React, { useReducer } from 'react';
import axios from 'axios';

import UserReducer from './UserReducer';
import UserContext from './UserContext';

import { GET_ONE_USER, DELETE_USER, GET_USERS, CONTACT_ERROR, CLEAR_ERRORS } from '../types';

const UserState = (props) => {
	const InitialState = {
		loading: true,
		users: [],
		user: null,
		filtered: null,
		error: null
	};

	const [state, dispatch] = useReducer(UserReducer, InitialState);

	const deleteUser = (id) => {
		dispatch({ type: DELETE_USER, payload: id });
	};

	const getUsers = async () => {
		try {
			const res = await axios.get('/api/users');
			dispatch({
				type: GET_USERS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err
			});
		}
	};

	const getTutors = async () => {
		try {
			const res = await axios.get('/api/users/tutors');
			dispatch({
				type: GET_USERS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err
			});
		}
	};

	const getOneUser = async (id) => {
		try {
			const res = await axios.get('/api/users/id/' + id);
			dispatch({
				type: GET_ONE_USER,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: CONTACT_ERROR,
				payload: err.response.msg
			});
		}
	};

	const getTutorsByCourse = async (id) => {
		try {
			const res = await axios.get('/api/users/tutors/course/' + id);
			dispatch({
				type: GET_USERS,
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
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<UserContext.Provider
			value={{
				loading: state.loading,
				user: state.user,
				error: state.error,
				users: state.users,
				filtered: state.filtered,
				clearErrors,
				deleteUser,
				getUsers,
				getOneUser,
				getTutors,
				getTutorsByCourse
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export default UserState;
