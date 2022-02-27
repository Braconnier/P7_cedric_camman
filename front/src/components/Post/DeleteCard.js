import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../actions/post.actions';

const DeleteCard = ({ postId }) => {

    const dispatch = useDispatch()
    const deleteItem = () => dispatch(deletePost(postId));

    return (
        <div onClick={() => {
            if (window.confirm('Supprimer le post ?')) deleteItem();
        }}>
            <img className='icons' src="./assets/icons/trash.svg" alt="corbeille" />
        </div>
    );
};

export default DeleteCard;