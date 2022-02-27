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
                        <h3>Actuellement</h3>
                    </div>
                </NavLink>
                <NavLink exact to='/trending'>
                    <div className="trending link">
                        <img src="./assets/icons/trending.svg" alt="logo" />
                        <h3>en vogue</h3>
                    </div>
                </NavLink>
                <NavLink exact to='/profile'>
                    <div className="profile link">
                        <img src="./assets/icons/profile.svg" alt="logo" />
                        <h3>Profile</h3>
                    </div>
                </NavLink>
            </div>
            <div className="logo">Bienvenue sur Groupmania Social</div>
            {uid
                ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink exact to='/profile'>
                                <h3>Bonjour <br />{userData.name}</h3>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                )
                : (
                    <ul>
                        <li></li>
                        <li className='login-link'>
                            <NavLink exact to='/profile'>
                                <img src='./assets/icons/login.svg' alt='login' />
                            </NavLink>
                        </li>
                    </ul>

                )}
        </nav>
    );
};

export default Navbar;
