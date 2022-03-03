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
        const emailError = document.querySelector('.email')
        const passwordError = document.querySelector('.password')
        const nameError = document.querySelector('.name')

        nameError.innerHTML = ''
        emailError.innerHTML = ''
        passwordError.innerHTML = ''

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
            .then(() => {
                setFormSubmit(true)
            })
            .catch((err) => {
                let message = err.response.data.errors[0].message
                switch (message) {
                    case 'name must be unique':
                        return nameError.innerHTML = 'Ce nom est déja utilisé';
                    case 'name cannot be null':
                        return nameError.innerHTML = 'Veuillez entrer un nom';
                    case 'name cannot be empty':
                        return nameError.innerHTML = 'Veuillez entrer un nom';
                    case 'email cannot be null':
                        return emailError.innerHTML = 'Veuillez entrer un email';
                    case 'email must be unique':
                        return emailError.innerHTML = 'Cette adresse mail est déjà utilisée';
                    case 'email cannot be empty':
                        return emailError.innerHTML = 'Veuillez entrer un email';
                    case 'email must be valid':
                        return emailError.innerHTML = 'Veuillez entrer un email valide';
                    case 'invalid password length':
                        return passwordError.innerHTML = 'Le mot de passe doit comporter entre 8 et 12 caractères';
                    case 'password must meet the criterias':
                        window.alert('Le mot de passe doit comporter entre 8 et 10 caractères. Il doit comprendre au moins une lettre miniscule, une lettre majuscule, un chiffre et un caractère spécial (!#$%&?@.");')
                        return passwordError.innerHTML = 'le mot de passe ne correspond pas aux critères de sécurité';
                    default:
                        return err
                }
            })

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
                            <div className="name error"></div>
                        </div>
                        <div className='formfields'>
                            <label htmlFor="email">Email</label>
                            <input type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} />
                            <div className="email error"></div>
                        </div>
                        <div className='formfields'>
                            <label htmlFor="password">Mot de passe</label>
                            <input type="password" name='password' onChange={(e) => setPassword(e.target.value)} value={password} />
                            <div className="password error"></div>
                        </div>
                        <input className='button register' type="submit" value="S'inscrire" />
                    </form>
                )}
        </>
    );
};

export default Register;