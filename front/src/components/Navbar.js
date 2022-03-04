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
                        <img src="./assets/icons/icon.svg" alt="lien page d'accueil" />
                        <p className='title'>Actualité</p>
                    </div>
                </NavLink>
                <NavLink exact to='/trending'>
                    <div className="trending link">
                        <img src="./assets/icons/trending.svg" alt="lien top 3" />
                        <p className='title'>Top 3</p>
                    </div>
                </NavLink>
                <NavLink exact to='/profile'>
                    <div className="profile link">
                        <img src="./assets/icons/profile.svg" alt="lien profile" />
                        <p className='title'>Profile</p>
                    </div>
                </NavLink>
            </div>
            <div className="welcome-container">
                {uid
                    ? (<>
                        <div className='welcome'>
                            <img className='logo-group' src="./assets/icon-left-font-monochrome-black.svg" alt="logo" />
                            <p className='welcome-message title'>Bonjour {userData.name}</p>
                        </div>
                        <div >
                            <Logout />
                        </div>
                    </>
                    )
                    : (
                        <NavLink exact to='/profile'>
                            <div className='log link'>
                                <img src='./assets/icons/login.svg' alt='login' />
                                <p className='title'>Entrer</p>
                            </div>
                        </NavLink>

                    )

                }
            </div>
        </nav >
    );
};

export default Navbar;
