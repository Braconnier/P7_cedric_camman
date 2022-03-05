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
                <NavLink to='/'>
                    <div className="home link">
                        <img src="./assets/icons/icon.svg" alt="lien page d'accueil" />
                        <h1 className='title'>Actualité</h1>
                    </div>
                </NavLink>
                <NavLink to='/profile'>
                    <div className="profile link">
                        <img src="./assets/icons/profile.svg" alt="lien profile" />
                        <h1 className='title'>Profile</h1>
                    </div>
                </NavLink>
            </div>
            <div className="welcome-container">
                {uid
                    ? (<>
                        <div className='welcome'>
                            <img className='logo-group' src="./assets/icon-left-font-monochrome-black.svg" alt="logo groupomania" />
                            <h2 className='welcome-message title'>Bonjour {userData.name}</h2>
                        </div>
                        <div >
                            <Logout />
                        </div>
                    </>
                    )
                    : (
                        <NavLink to='/profile'>
                            <div className='welcome'>
                                <img className='logo-group' src="./assets/icon-left-font-monochrome-black.svg" alt="logo groupomania" />
                                <div className='log link'>
                                    <img src='./assets/icons/login.svg' alt='login' />
                                    <h1 className='title'>Entrer</h1>
                                </div>
                            </div>
                        </NavLink>

                    )

                }
            </div>
        </nav >
    );
};

export default Navbar;
