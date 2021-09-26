import React, { useContext, useEffect, useRef } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import StarRatings from 'react-star-ratings';


const Tutors = ( {tutorContent} ) => {

    const {fname} = tutorContent

	return (
		<div>
            <p>{fname}</p>
            <div>
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
		</div>
	);
}

export default Tutors;