import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, uploadProfilePicture } from '../../actions/user.actions';
import { getUsers } from '../../actions/users.actions';


const UploadImage = () => {

    const [file, setFile] = useState()
    const [filename, setFilename] = useState('')

    const dispatch = useDispatch()
    const uuid = useSelector((state) => state.userReducer.uuid)

    const handlePicture = async (e) => {
        e.preventDefault()
        if (!file) {
            return
        } else {
            const formData = new FormData();
            formData.append('file', file, filename);
            await dispatch(uploadProfilePicture(formData, uuid))
            setFile()
            setFilename('')
            dispatch(getUser(uuid))
            dispatch(getUsers())
        }
    }
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic" >
            <div className="input-wrapper">
                <div className="send-pic-wrapper">
                    <img className='icons' src="./assets/icons/sendpic.svg" title='editer' alt="editer" />
                    <label htmlFor="file">Changer d'image de profile</label>
                    <input
                        id='file'
                        type="file"
                        name='file'
                        accept='.jpg, .jpeg, .png, .webp, .gif'
                        onChange={(e) => {
                            setFile(e.target.files[0]);
                            setFilename(e.target.files[0].name)
                        }}
                    />
                </div>
                <input className='button' type="submit" value='valider' />
            </div>
        </form>
    );
};

export default UploadImage;