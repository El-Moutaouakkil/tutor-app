import React, {useContext, useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import AuthContext from '../context/auth-context/AuthContext';
import LinearProgress from '@mui/material/LinearProgress';

const UserHome = (props) => {

	const authContext = useContext(AuthContext);
	const {user, loading} = authContext;

	useEffect(() => {
		authContext.loadUser();
	}, []);

    const renderTutorBadge = () => {
      if (user.isTutor) {
        return <span class="badge bg-success">Tutor</span>;
      } else {
        return;
      }
    }

	return (
		<div>
			{user !== null && !loading ? (
				<div>
					<div id="user-home-topbar">
						<h1>{user.fname} {user.lname} {renderTutorBadge()}</h1> 
					</div>
					<hr />
					<div id="user-home-tutors">
						<h2>Current Tutors</h2>
					</div>
					<hr />
					<div id="user-home-courses">	
						<div className='flex-row'>
							<h2>Current Courses</h2>
							<Button variant="dark">Add</Button>
						</div>
						<hr />
						
					</div>
				</div>
            ): (
				<LinearProgress />
			)}
		</div>
	);
}

export default UserHome;
