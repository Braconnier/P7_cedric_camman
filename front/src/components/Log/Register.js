import axios from 'axios';
import React, { useState } from 'react';
import Login from './Login';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [formSubmit, setFormSubmit] = useState(false)

    const handleRegister = (e) => {
        e.preventDefault()
        const emailError = document.querySelector('.email-error')
        const passwordError = document.querySelector('.password-error')
        const nameError = document.querySelector('.name-error')


        axios({
            method: 'post',
            url: `/users/auth/register`,
            withCredentials: true,
            data: {
                email,
                password,
                name
            },

        })
            .then((res) => {

                if (res.data.errors) {
                    console.log('erreur')
                    emailError.innerHTML = res.data.errors.message
                    passwordError.innerHTML = res.data.errors.password
                    nameError.innerHTML = res.data.errors.name

                } else {
                    setFormSubmit(true)
                }
            })
            .catch((err) => console.log(err))

    }

    return (
        <>
            {formSubmit
                ? (
                    <>
                        <Login />
                        <h4 className='form-submit-true'>Enregistrement réussi, veuillez vous connecter</h4>
                    </>
                )
                : (

                    <form action="" onSubmit={handleRegister} id='register-form'>
                        <div className='formfields'>
                            <label htmlFor="name">Nom / Pseudonyme</label>
                            <input type="text" name='name' onChange={(e) => setName(e.target.value)} value={name} />
                            <div className="name-error"></div>
                        </div>
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
                        <input className='button register' type="submit" value="S'inscrire" />
                    </form>
                )}
        </>
    );
};

export default Register;