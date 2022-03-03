import React, { useContext, useState, useEffect } from 'react';
import { UidContext } from '../AppContext';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { getPosts, likePost } from '../../actions/post.actions';
import { useDispatch } from 'react-redux';




const LikeButton = ({ post }) => {
    const dispatch = useDispatch()
    const [isAuthor, setIsAuthor] = useState(false)
    const [liked, setLiked] = useState(Boolean)
    const uid = useContext(UidContext)

    const handleLike = async () => {
        await dispatch(likePost(post));
        await dispatch(getPosts())
    }




    useEffect(() => {
        if (post.userId.includes(uid)) setIsAuthor(true)
        let found = post.Likes.find(like => like.userId === uid)
        if (found) {
            return setLiked(true)
        } else {
            return setLiked(false)
        }
    }, [uid, post.userId, post.Likes]);


    return (
        <div className='like-container'>
            {uid === null && (
                <Popup trigger={<img className='icons' id='like' src='./assets/icons/heart.svg' alt='like' />}
                    position={['bottom center', 'bottom right', 'bottom left']}
                    closeOnDocumentClick>
                    <div>Connectez-vous pour liker</div>
                </Popup>
            )}
            {uid && isAuthor && (
                <img className='icons' id='like' src='./assets/icons/heart-filled.svg' alt='like' />
            )}
            {uid && isAuthor === false && liked && (
                <img className='icons' id='like' src='./assets/icons/heart-filled.svg' alt='like' onClick={handleLike} />
            )}
            {uid && isAuthor === false && !liked && (
                <img className='icons' id='like' src='./assets/icons/heart.svg' alt='like' onClick={handleLike} />
            )}
            <div className="likes-count">{post.Likes.length}</div>
        </div>
    );
};

export default LikeButton;