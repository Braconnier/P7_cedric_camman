import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';

const Navbar = () => {

    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)

    return (
        <nav className='nav'>
            <div className="nav-container">
                <NavLink exact to='/'>
                    <div className="home link">
                        <img src="./assets/icons/icon.svg" alt="logo" />
                        <h3>Actualité</h3>
                    </div>
                </NavLink>
                <NavLink exact to='/trending'>
                    <div className="trending link">
                        <img src="./assets/icons/trending.svg" alt="logo" />
                        <h3>Top 3</h3>
                    </div>
                </NavLink>
                <NavLink exact to='/profile'>
                    <div className="profile link">
                        <img src="./assets/icons/profile.svg" alt="logo" />
                        <h3>Profile</h3>
                    </div>
                </NavLink>
            </div>
            <div className="welcome-container">
                {uid
                    ? (<>
                        <h3 className='welcome-message'>Bonjour {userData.name}</h3>
                        <div >
                            <Logout />
                        </div>
                    </>
                    )
                    : (
                        <NavLink exact to='/profile'>
                            <div className='log link'>
                                <img src='./assets/icons/login.svg' alt='login' />
                                <h3>Entrer</h3>
                            </div>
                        </NavLink>

                    )

                }
            </div>
        </nav >
    );
};

export default Navbar;
