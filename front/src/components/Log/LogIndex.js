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
                <ul className='log-options' aria-label='options de connection'>
                    <li aria-label="bouton d'inscription" onClick={handleModals} id='register' className={registerModal ? 'active-btn' : null}>S'inscrire</li>
                    <li aria-label='bouton de connection' onClick={handleModals} id='login' className={loginModal ? 'active-btn' : null}>Se connecter</li>
                    {registerModal && <p className='password-criterias' aria-label='criteres de mot de passe'>Le mot de passe doit comporter entre 8 et 10 caractères. Il doit comprendre au moins une lettre miniscule, une lettre majuscule, un chiffre et un caractère spécial: !#$%&?@</p>}
                </ul>
                {registerModal && <Register />}
                {loginModal && <Login />}
            </div>

        </div>

    );
};

export default Log;