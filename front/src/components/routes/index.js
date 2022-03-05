import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import NoMatch from '../../pages/NoMatch';
import Profile from '../../pages/Profile';
import Trending from '../../pages/Trending';
import Navbar from '../Navbar';

const index = () => {
    return (
        <div className='router'>
            <Router>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/trending' element={<Trending />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='*' element={<NoMatch status={404} />} />
                </Routes>
            </Router>
        </div>
    );
};

export default index;