import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../context/auth-context/AuthContext';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';

const TutorProfile = (props) => {

	const authContext = useContext(AuthContext);
	const { user, getOneUser, loading } = authContext;

    useEffect(() => {
		getOneUser(props.match.params.id);
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
                    <div id="tutor-home-topbar">
                        <h1>{user.fname} {user.lname} {renderTutorBadge()}</h1> 
                        <div id="profile-contact">
                            <p>Email</p>
                            <p>Phone</p>
                        </div>
                    </div>
                    <hr />
                    <div id="tutor-home-courses">
                        <h2>Teaching Courses</h2>
                        <hr />
                        <div id="course-card-holder">

                        </div>
                    </div>   
                </div>
            ): (
				<LinearProgress />
			)}
        </div>
    );
}

export default TutorProfile;
