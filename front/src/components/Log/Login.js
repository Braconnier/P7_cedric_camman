import React, { useState } from 'react';

import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {

        e.preventDefault();
        const emailError = document.querySelector('.email-error')
        const passwordError = document.querySelector('.password-error')

        emailError.innerHTML = ''
        passwordError.innerHTML = ''


        const data = {
            email, password
        }

        axios.post(`/users/auth/login`, data)
            .then((res) => {
                if (res.data) {
                    localStorage.setItem("token", `${res.data.accessToken}`);
                    localStorage.setItem('user', `${res.data.userUuid}`)
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log({ err })
                let message = err.response.data.errors[0].message
                switch (message) {
                    case 'user not found':
                        return emailError.innerHTML = 'Utilisateur non trouvé';
                    case 'invalid password':
                        return passwordError.innerHTML = 'Mot de passe incorrect';
                    default:
                        return err
                }
            })
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