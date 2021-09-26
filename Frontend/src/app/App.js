import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import AOS from 'aos';

// CSS
import '../css/index.css';

// Components
import Home from '../routes/Home'
import AboutUs from '../routes/Aboutus'
import Login from '../routes/Login'
import SignUp from '../routes/Sign-up'
import Courses from '../routes/Courses'
import Tutors from '../routes/Tutors'
import NotFound from '../routes/NotFound'
import Navbar from '../components/Navbar';

// State and Token
import AuthState from '../context/auth-context/AuthState';
import AlertState from '../context/alert-context/AlertState';
import setAuthToken from '../utils/setAuthTokens';


if (localStorage.token) {
	setAuthToken(localStorage.token);
}

AOS.init();

function App() {
  return (
    <AuthState>
      <AlertState>
        <Router>
          <Fragment>
            <div className="content">
                <Navbar />
                <div className="page-content">
                    <Switch>
                        <Route exact path='/'><Home/></Route>
                        <Route exact path='/index'><Home/></Route>
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
		</AuthState>
  );
}

export default App;
