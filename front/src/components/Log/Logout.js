import React from 'react';


const Logout = () => {
    const logout = () => {
        localStorage.clear();
        window.location = '/';
    }
    return (
        <li onClick={logout}>
            <img src="./assets/icons/logout.svg" alt="logout" />
        </li>
    );

};

export default Logout;