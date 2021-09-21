import React, { Fragment } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import '../css/index.css';

import Home from '../routes/Home'
import AboutUs from '../routes/Aboutus'
import Login from '../routes/Login'
import SignUp from '../routes/Sign-up'
import Courses from '../routes/Courses'
import Tutors from '../routes/Tutors'
import NotFound from '../routes/NotFound'
import Navbar from '../components/Navbar';

function App() {
  return (
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
  );
}

export default App;
