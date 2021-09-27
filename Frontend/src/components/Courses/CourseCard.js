import React, { useContext, useEffect, useRef } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';


const CourseCard = ( {courseContent} ) => {

    const {name, description, _id} = courseContent

	return (
		<div>
            <Link to={`/tutor/${_id}`}>
                <div className="tutor-card">
                <p>Test</p>
                </div>
            </Link>
		</div>
	);
}

export default CourseCard;