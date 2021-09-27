import React, { useContext, useEffect, useRef } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';


const TutorCard = ( {tutorContent} ) => {

    const {fname, lname, _id} = tutorContent

	return (
		<div>
            <Link to={`/tutor/${_id}`}>
                <div className="tutor-card">
                <h3>{fname}</h3>
                <h3>{lname}</h3>

                    <StarRatings
                        rating={4.5}
                        starRatedColor='black'
                        // changeRating={this.changeRating}
                        starDimension='30px'
                        starSpacing='1px'
                        numberOfStars={5}
                        name='rating'
                        id='star-rating'
                    />
                </div>
            </Link>
		</div>
	);
}

export default TutorCard;