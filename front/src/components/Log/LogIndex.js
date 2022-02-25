import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';

const Log = (props) => {
    const [loginModal, setLoginModal] = useState(props.login);
    const [registerModal, setRegisterModal] = useState(props.register);

    const handleModals = (e) => {
        if (e.target.id === 'register') {
            setLoginModal(false)
            setRegisterModal(true)
        } else if (e.target.id === 'login') {
            setLoginModal(true)
            setRegisterModal(false)
        }
    }

    return (
        <div className='connection-form'>
            <div className="form-container">
                <ul className='log-options'>
                    <li onClick={handleModals} id='register' className={registerModal ? 'active-btn' : null}>S'inscrire</li>
                    <li onClick={handleModals} id='login' className={loginModal ? 'active-btn' : null}>Se connecter</li>
                </ul>
                {registerModal && <Register />}
                {loginModal && <Login />}
            </div>

        </div>
    );
};

export default Log;