import React, {useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Semicircle from '../img/img2.png';
import {Link} from 'react-router-dom';
import AuthContext from '../context/auth-context/AuthContext';

const Home = () => {
	
	const authContext = useContext(AuthContext);
	const {isAuthenticated, logout} = authContext;

	if (isAuthenticated) {
		return (
			<div>
				<div id='img-cont'>
					<div >
						<h1 id='home-header'>Rethinq</h1>
						<p id='sub-header'>A free peer to peer tutoring service</p>
					</div>
					<div id='circle-cont'>
							<img src={Semicircle} alt='' />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div id='img-cont'>
				<div >
					<h1 id='home-header'>Rethinq</h1>
					<p id='sub-header'>A free peer to peer tutoring service</p>
					<div className='flex-column'>
						<Link to='/login'><Button variant='light' className='btn-block'>Login</Button></Link>
						<Link to='/signup'><Button variant='light' className='btn-block'>Register</Button></Link>
					</div>
				</div>
				<div id='circle-cont'>
						<img src={Semicircle} alt='' />
				</div>
			</div>
		</div>
	);
}


export default Home;
