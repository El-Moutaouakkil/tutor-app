import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthContext from '../context/auth-context/AuthContext';

const Navbar = () => {
	
	const authContext = useContext(AuthContext);
	const {isAuthenticated, logout} = authContext;

	const onSignOut = () => {
		logout();
	};

	if (isAuthenticated) {
		return (
			<div>
				<nav className='nav-logged-in'>
					<div id='nav-left'>
						<Link to='/index'>
							<a>Home</a>
						</Link>
						<Link to='/courses'>
							<a href=''>Courses</a>
						</Link>
						<Link to='/tutors'>
							<a href=''>Tutors</a>
						</Link>
						<Link to='/userhome'>
							<a>My Account</a>
						</Link>
					</div>
					<div id='nav-right'>
						<Link onClick={onSignOut} to='/index'>
							<a>Sign Out</a>
						</Link>
					</div>
				</nav>
			</div>
		);
	}

	return (
		<div>
			<nav className='nav-not-logged-in'>
				<div id='nav-left'>
					<Link to='/index'>
						<a>Home</a>
					</Link>
					<Link to='/login'>
						<a>Login</a>
					</Link>
					<Link to='/signup'>
						<a>Sign-up</a>
					</Link>
					<Link to='/courses'>
						<a href=''>Courses</a>
					</Link>
                    <Link to='/tutors'>
						<a href=''>Tutors</a>
					</Link>
				</div>
				<div id='nav-right'>
					<Link to='/aboutus'>
						<a href=''>About Us</a>
					</Link>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
