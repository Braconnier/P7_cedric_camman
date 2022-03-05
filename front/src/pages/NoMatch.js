import React from 'react';
import { NavLink } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div className='page-not-found'>
            <h1 className="not-found-banner">On dirait que vous avez perdu votre chemin.</h1>
            <div className="home link">
                <NavLink to='/'>
                    <div className="not-found-img-container">
                        <div className="container">
                            <img src="./assets/icons/icon.svg" alt="lien vers la page d'accueil" />
                        </div>
                        <h1 className='title'>Retour à l'accueil</h1>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

export default NoMatch;