import React, { useContext, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';

const Tutors = (props) => {

	const authContext = useContext(AuthContext);

	const { isAuthenticated } = authContext;

	const text = useRef('');

	// useEffect(() => {
	// 	if (filtered === null) {
	// 		text.current.value = '';
	// 	}
	// });

	const onChange = (e) => {
		console.log("yay")
	};

	return (
		<div>
			<h1 className="display-1">Tutors</h1>
			<form>
					<input
						ref={text}
						type='text'
						placeholder='Find Tutors...'
						onChange={onChange}
						class='form-control'
					/>
			</form>
			<br />
		</div>
	);
}

export default Tutors;