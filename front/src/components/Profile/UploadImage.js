import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadProfilePicture } from '../../actions/user.actions';

const UploadImage = () => {

    const [file, setFile] = useState()
    const [filename, setFilename] = useState('')

    const dispatch = useDispatch()
    const uuid = useSelector((state) => state.userReducer.uuid)

    const handlePicture = (e) => {
        e.preventDefault()
        if (!file) {
            return
        } else {
            const formData = new FormData();
            formData.append('file', file, filename);
            dispatch(uploadProfilePicture(formData, uuid))
            setFile()
            setFilename('')
        }
    }
    return (
        <form action="" onSubmit={handlePicture} className="upload-pic" >
            <label htmlFor="file">Changer d'image de profile</label>
            <div className="input-wrapper">
                <input
                    className='button'
                    type="file"
                    id='file'
                    name='file'
                    accept='.jpg, .jpeg, .png, .webp, .gif'
                    onChange={(e) => {
                        setFile(e.target.files[0]);
                        setFilename(e.target.files[0].name)
                    }}
                />
                <br />
                <input type="submit" value='valider' />
            </div>
        </form>
    );
};

export default UploadImage;