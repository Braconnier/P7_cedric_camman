import React, { useContext } from 'react';
import Log from '../components/Log/LogIndex'
import { UidContext } from "../components/AppContext"
import UpdateProfile from '../components/Profile/UpdateProfile';

const Profile = () => {

    const uid = useContext(UidContext)
    return (
        <div className='profile-page'>
            {uid
                ? (<UpdateProfile />)
                : (<div className="log-container">
                    <Log register={false} login={true} />
                    <div className="img-container">
                        <img src="./assets/icon-above-font.png" alt="img-log" />
                    </div>
                </div>
                )}
        </div>
    );
};

export default Profile;