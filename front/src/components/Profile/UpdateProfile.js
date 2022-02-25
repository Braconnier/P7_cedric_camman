import React, { useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UploadImage from './UploadImage';
import { dateParser } from '../../utils/utils'
import { UidContext } from '../AppContext';
import { updateBio } from '../../actions/user.actions';

const UpdateProfile = () => {
    const uid = useContext(UidContext)
    const userData = useSelector((state) => state.userReducer)
    const dispatch = useDispatch()

    const [bio, setBio] = useState('')
    const [updateForm, setUpdateForm] = useState(false)

    const handleUpdate = () => {
        dispatch(updateBio(userData.uuid, bio))
        setUpdateForm(false)

    }

    return (
        <div className='profile-container'>
            <h1>Profile de {userData.name}</h1>
            <div className="update-container">
                <div className="lr-container">
                    <div className="left-container">
                        <h3>Photo de profile</h3>
                        <div className="image-box">
                            <img src={`http://localhost:5000${userData.profileImgUrl}`} alt="profile pic" />
                        </div>
                        {uid === userData.uuid && (<UploadImage />)}
                    </div>
                    <div className="right-container">
                        <h1>{userData.name}</h1>
                        <p>{userData.role} depuis le {dateParser(userData.createdAt)}</p>
                        <div className="bio-update">
                            <h3>Bio</h3>
                            {updateForm === false && (
                                <>
                                    <p>{userData.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier</button>
                                </>
                            )}
                            {updateForm && (
                                <>
                                    <textarea name="text" defaultValue={userData.bio} onChange={(e) => setBio(e.target.value)}>
                                    </textarea>
                                    <button onClick={handleUpdate}>Valider</button>
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