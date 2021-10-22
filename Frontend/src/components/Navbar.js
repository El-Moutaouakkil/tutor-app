import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth-context/AuthContext";

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenticated, logout } = authContext;

    const onSignOut = () => {
        logout();
    };

    if (isAuthenticated) {
        return (
            <div>
                <nav className='nav-logged-in'>
                    <div id='nav-left'>
                        <Link to='/userhome'>My Account</Link>
                        <Link to='/courses'>Courses</Link>
                        <Link to='/tutors'>Tutors </Link>
                    </div>
                    <div id='nav-right'>
                        <Link onClick={onSignOut} to='/index'>
                            Sign Out{" "}
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
                    <Link to='/index'>Home </Link>
                    <Link to='/login'>Login </Link>
                    <Link to='/signup'>Sign-up </Link>
                    <Link to='/courses'>Courses </Link>
                    <Link to='/tutors'>Tutors </Link>
                </div>
                <div id='nav-right'>
                    <Link to='/aboutus'>About Us </Link>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
