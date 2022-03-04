import React from 'react';


const Logout = () => {
    const logout = () => {
        localStorage.clear();
        window.location = '/';
    }
    return (
        <div className='log link' onClick={logout}>
            <img className='icons' src="./assets/icons/logout.svg" alt="logout" />
            <h1>Sortir</h1>
        </div>
    );

};

export default Logout;