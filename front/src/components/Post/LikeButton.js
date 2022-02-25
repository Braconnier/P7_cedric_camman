import React, { useContext, useState, useEffect } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import axios from 'axios'




const LikeButton = ({ post }) => {

    const [liked, setLiked] = useState(false)
    const uid = useContext(UidContext)
    const handleLike = () => axios.post(`/post/vote/${post.id}`)
    console.log(post.id)



    useEffect(() => {
        if (post.userId.includes(uid)) setLiked(true)
    }, [uid, post.userId, liked])
    return (
        <div className='like-container'>
            {uid === null && (
                <Popup trigger={<img id='like' src='./assets/icons/heart.svg' alt='like' />}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour liker</div>
                </Popup>
            )}
            {uid && liked === false && (
                <img id='like' src='./assets/icons/heart.svg' alt='like' onClick={handleLike} />
            )}
            {uid && liked && (
                <img id='like' src='./assets/icons/heart-filled.svg' alt='like' onClick={handleLike} />
            )}
            <div className="likes-count">{post.likes}</div>
        </div>
    );
};

export default LikeButton;