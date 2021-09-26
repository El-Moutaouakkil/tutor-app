import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';

const StudentProfile = (props) => {

    return (
        <div>
            <div id="user-home-topbar">
                <h1>John Doe</h1>
                <div id="profile-contact">
                    <p>Email</p>
                    <p>Phone</p>
                </div>
            </div>
            <hr />
            <div id="user-home-courses">
                <h2>Current Courses</h2>
            </div>
            <hr />
        </div>
    );
}


export default StudentProfile;
