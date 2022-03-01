import React, { useState } from 'react';

import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {

        e.preventDefault();
        const emailError = document.querySelector('.email-error')
        const passwordError = document.querySelector('.password-error')

        const data = {
            email, password
        }

        axios.post(`/users/auth/login`, data)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem("token", `${res.data.accessToken}`);
                    localStorage.setItem('user', `${res.data.userUuid}`)
                }

                if (res.data === 'Utilisateur non trouvé !') {
                    console.log('erreur')
                    emailError.innerHTML = res.data
                    passwordError.innerHTML = res.data.errors.password

                } else {
                    window.location = '/';
                }
            })
            .catch((err) => console.log(err))

    }

    return (
        <form action="" onSubmit={handleLogin} id='login-form'>
            <div className='formfields'>
                <label htmlFor="email">Email</label>
                <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                <div className="email-error"></div>
            </div>
            <div className='formfields'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                <div className="password-error"></div>
            </div>
            <input className='button login' type="submit" value='Se connecter' />
        </form>
    );
};

export default Login;