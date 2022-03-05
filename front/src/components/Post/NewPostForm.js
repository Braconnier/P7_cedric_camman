import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from '../../utils/utils';
import { NavLink } from 'react-router-dom'
import { addPost, getPosts } from '../../actions/post.actions';


const NewPostForm = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [message, setMessage] = useState('')
    const [postPicture, setPostPicture] = useState(null)
    const [file, setFile] = useState()
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch()

    useEffect(() => {
        if (!isEmpty(userData)) setIsLoading(false)
    }, [userData, message])

    const handlePost = async () => {
        if (message || postPicture) {
            const data = new FormData()
            data.append('userId', userData.uuid)
            data.append('body', message)
            if (file) data.append('file', file)

            await dispatch(addPost(data))
            dispatch(getPosts())
            cancelPost()

        } else {
            alert("Votre message est vide")
        }
    }

    const handlePicture = (e) => {
        setPostPicture(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }


    const cancelPost = () => {
        setMessage('')
        setPostPicture('')
        setFile(null)
    }

    return (
        <div className='post-container'>
            {isLoading
                ? (<i className='fas fa-spinner fa-spin'></i>)
                : (
                    <>
                        <div className="data">
                            <NavLink to="profile">
                                <div className="user-info">
                                    <div className="img-container">
                                        <img src={`http://localhost:5000${userData.profileImgUrl}`} alt="profile pic" />
                                    </div>
                                    <h3 className="user-name">A votre tour {userData.name}</h3>
                                </div>
                            </NavLink>
                            <div className="post-form">
                                <textarea className="post-form-text" name="message" id="message" maxLength="500" placeholder='Que voulez-vou partager ?' onChange={(e) => setMessage(e.target.value)} value={message} />
                                {message || postPicture ? (<>
                                    <div className='img-preview-container'>
                                        {postPicture && <img src={postPicture} alt="preview" />}
                                    </div>
                                </>
                                ) : null}
                                <div className="footer-form">
                                    <div className="send-picture-icon">
                                        <img className='icons' src="./assets/icons/sendpic.svg" alt="edit" />
                                        <label htmlFor="file">Charger une image</label>
                                        <input type="file" id='file-upload' name='file' accept='.jpeg, .jpg, .png, .gif, .webp' onChange={(e) => { handlePicture(e) }} aria-label='charger une image' />
                                    </div>
                                    <div className="send-button">
                                        {message || postPicture
                                            ? (<button className="button cancel" onClick={cancelPost}>Annuler</button>)
                                            : null
                                        }

                                        <button className="button send" onClick={handlePost}>Envoyer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
        </div>
    );
};

export default NewPostForm;