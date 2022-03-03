import React from 'react';


const Logout = () => {
    const logout = () => {
        localStorage.clear();
        window.location = '/';
    }
    return (
        <div onClick={logout}>
            <img className='icons' src="./assets/icons/logout.svg" alt="logout" />
            <h3>Sortir</h3>
        </div>
    );

};

export default Logout;