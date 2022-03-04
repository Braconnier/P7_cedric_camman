import React, { useState } from 'react';

import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (e) => {

        e.preventDefault();
        const emailError = document.querySelector('.email')
        const passwordError = document.querySelector('.password')

        emailError.innerHTML = ''
        passwordError.innerHTML = ''


        const data = {
            email, password
        }

        axios.post(`/users/auth/login`, data)
            .then((res) => {
                if (res.data.accessToken) {
                    localStorage.setItem("token", `${res.data.accessToken}`);
                    localStorage.setItem('user', `${res.data.userUuid}`)
                    window.location = '/';
                } else {
                    window.alert('une erreur est survenue')
                }
            })
            .catch((err) => {
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
                <br />
                <input className='fields' type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} aria-label='entrer votre email' />
                <div className="email error"></div>
            </div>
            <div className='formfields'>
                <label htmlFor="password">Mot de passe</label>
                <br />
                <input className='fields' type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} aria-label='entrer votre mot de passe' />
                <div className="password error"></div>
            </div>
            <input className='button login' type="submit" value='Se connecter' aria-label='Se connecter' />
        </form>
    );
};

export default Login;