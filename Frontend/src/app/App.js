import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';

// CSS
import '../css/index.css';

// Components
import Home from '../routes/Home'
import UserHome from '../routes/UserHome'
import StudentProfile from '../routes/StudentProfile'
import TutorProfile from '../routes/TutorProfile'
import CourseProfile from '../routes/CourseProfile'
import AboutUs from '../routes/Aboutus'
import Login from '../routes/Login'
import SignUp from '../routes/Sign-up'
import Courses from '../routes/Courses'
import Tutors from '../routes/Tutors'
import NotFound from '../routes/NotFound'
import Navbar from '../components/Navbar';
import PrivateRoute from '../routes/PrivateRoute';

// State and Token
import AuthState from '../context/auth-context/AuthState';
import AlertState from '../context/alert-context/AlertState';
import UserState from '../context/user-context/UserState';
import setAuthToken from '../utils/setAuthTokens';


if (localStorage.token) {
	setAuthToken(localStorage.token);
}

AOS.init();

function App() {
  return (
    <AuthState>
      <UserState>
        <AlertState>
          <Router>
            <Fragment>
              <div className="content">
                  <Navbar />
                  <div className="page-content">
                      <Switch>
                          <Route exact path='/'><Home/></Route>
                          <Route exact path='/index'><Home/></Route>
                          <PrivateRoute path='/userhome' component={UserHome}/>
                          <PrivateRoute path='/student/:id' component={StudentProfile}/>
                          <Route exact path='/tutor/:id' ><TutorProfile/></Route>
                          <Route exact path='/course/:id' ><CourseProfile/></Route>
                          <Route exact path='/aboutus' ><AboutUs/></Route>
                          <Route exact path='/login' ><Login/></Route>
                          <Route exact path='/signup' ><SignUp/></Route>
                          <Route exact path='/courses' ><Courses/></Route>
                          <Route exact path='/tutors' ><Tutors/></Route>
                          <Route exact path='/*' ><NotFound/></Route>
                      </Switch>
                  </div>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </UserState>
		</AuthState>
  );
}

export default App;
