import React, { useContext, useState, useEffect } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import axios from 'axios'
import { getPosts } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';




const LikeButton = ({ post }) => {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const uid = useContext(UidContext)
    const handleLike = async () => {
        await axios.post(`/post/vote/${post.id}`);
        dispatch(getPosts())
    }



    useEffect(() => {
        if (post.userId.includes(uid)) setLiked(true)
    }, [uid, post.userId, post.likes])
    return (
        <div className='like-container'>
            {uid === null && (
                <Popup trigger={<img className='icons' id='like' src='./assets/icons/heart.svg' alt='like' />}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour liker</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img className='icons' id='like' src='./assets/icons/heart.svg' alt='like' onClick={handleLike} />
            )}
            {uid && liked && (
                <img className='icons' id='like' src='./assets/icons/heart-filled.svg' alt='like' />
            )}
            <div className="likes-count">{post.likes}</div>
        </div>
    );
};

export default LikeButton;