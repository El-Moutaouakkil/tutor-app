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
		// Will load all recipes into the context
		getTutors();
	}, []);


	return (
		<div>
			<h1 className="display-1">Tutors</h1>
			<form>
					<input
						type='text'
						placeholder='Find Tutors...'
						class='form-control'
					/>
			</form>
			<br />
				{users !== [] && !loading ? (
					users.map((user) => (
						<div className='recipe-card-container'>
							<TutorCard tutorContent={user} />
						</div>
					))
				) : (
					<LinearProgress />
				)}
		</div>
	);
}

export default Tutors;