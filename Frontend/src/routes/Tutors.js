import React, { useContext, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import AuthContext from '../context/auth-context/AuthContext';
import UserContext from '../context/user-context/UserContext';
import LinearProgress from '@mui/material/LinearProgress';
import TutorCard from '../components/Tutors/TutorCard'

const Tutors = (props) => {

	const userContext = useContext(UserContext);

	const { users,loading, getTutors } = userContext;

	useEffect(() => {
		getTutors();
	}, []);


	return (
		<div>
			<h1 className="display-1">Tutors</h1>
			<form>
					<input
						type='text'
						placeholder='Find Tutors...'
						class='form-control search-field'
					/>
			</form>
			<br />
			<div className='recipe-card-container'>

				{users !== [] && !loading ? (
					users.map((user) => (
							<TutorCard tutorContent={user} />
					))
				) : (
					<LinearProgress />
				)}
			</div>
		</div>
	);
}

export default Tutors;