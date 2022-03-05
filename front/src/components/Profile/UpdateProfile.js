import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from './UploadImage';
import { dateParser } from '../../utils/utils'
import { UidContext } from '../AppContext';
import { getUser, updateBio } from '../../actions/user.actions';

const UpdateProfile = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const [bio, setBio] = useState('')
    const [updateForm, setUpdateForm] = useState(false)

    const handleUpdate = async () => {
        await dispatch(updateBio(userData.uuid, bio))
        setUpdateForm(false)
        await dispatch(getUser(uid))

    }

    return (
        <div className='profile-container'>
            <h1>Profile de {userData.name}</h1>
            <div className="update-container">
                <div className="lr-container">
                    <div className="left-container">
                        <h2>Photo de profile</h2>
                        <div className="image-box">
                            <img src={`http://localhost:5000${userData.profileImgUrl}`} alt="profile pic" />
                        </div>
                        {uid === userData.uuid && (<UploadImage />)}
                    </div>
                    <div className="right-container">
                        <div className="right-container-info">
                            <h1>{userData.name}</h1>
                            <p>{userData.role} depuis le {dateParser(userData.createdAt)}</p>
                            <h2>Bio</h2>
                        </div>
                        <div className="bio-update">
                            {updateForm === false && (
                                <>
                                    <p>{userData.bio}</p>
                                    <img className='icons' src="./assets/icons/edit.svg" title='editer' alt="editer" onClick={() => setUpdateForm(!updateForm)} />

                                </>
                            )}
                            {updateForm && (
                                <>
                                    <textarea className='bio-text' name="text" maxLength='255' defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)} />
                                    <img className='icons' src="./assets/icons/check.svg" title='valider modifications' alt="valider modifications" onClick={handleUpdate} />
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <p className="last-modified">Denière modification le {dateParser(userData.updatedAt)}</p>
            </div>
        </div>
    );
};

export default UpdateProfile;