import React, { useEffect, useState, useContext } from 'react';
import UserContext from '../context/user-context/UserContext';
import Button from 'react-bootstrap/Button';
import { useHistory, useParams } from 'react-router-dom';
import LinearProgress from '@mui/material/LinearProgress';
import { BsFillEnvelopeFill } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";

const TutorProfile = (props) => {

	const userContext = useContext(UserContext);
	const { user, getOneUser, loading } = userContext;

    const params = useParams()

    useEffect(() => {
		getOneUser(params.id);
	}, []);

    const renderBadge = () => {
		if(user.userType == 3){
			return <span className="badge bg-warning">Admin</span>;
		}
		else if (user.userType == 2) {
			return <span className="badge bg-success">Tutor</span>;
		} 
		else {
			return;
		}
    }

    console.log(user)
    return (
        <div>
            {user !== null && !loading ? (
                <div>
                    <div id="user-home-topbar">
                        <h1>{user.fname} {user.lname} {renderBadge()}</h1> 
                        <div id="profile-contact">
                            <div className="d-flex flex-row align-items-center"><BsFillEnvelopeFill/><p>&nbsp; {user.email}</p></div>
                            <div className="d-flex flex-row align-items-center"><AiOutlinePhone/><p>&nbsp; {user.phonenum}</p></div>
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
