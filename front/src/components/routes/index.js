import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Home from '../../pages/Home';
import Profile from '../../pages/Profile';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return (
        <div className='router'>
            <Router>
                <Navbar />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/trending' exact component={Trending} />
                    <Route path='/profile' exact component={Profile} />
                    <Redirect to='/' />
                </Switch>
            </Router>
        </div>
    );
};

export default index;