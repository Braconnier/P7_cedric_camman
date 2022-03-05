import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment, getPosts } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId, commenterRole }) => {
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState('')
    const uid = useContext(UidContext)


    const dispatch = useDispatch()

    const handleEdit = (e) => {
        e.preventDefault();
        if (text) {
            dispatch(editComment(comment.id, text, postId))
            setText('')
            setEdit(false)
        }
    }

    const handleDelete = async () => {
        await dispatch(deleteComment(comment.id))
        dispatch(getPosts())
    }

    let role = localStorage.getItem('role')

    useEffect(() => {
        const checkAuthority = () => {

            if ((uid === comment.userId) || (role === 'SuperAdmin') || ((role === 'moderator') && (commenterRole !== 'SuperAdmin'))) setIsAuthor(true)
        }
        checkAuthority()
    }, [uid, comment.userId])

    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img className='icons' src="./assets/icons/edit.svg" title='editer' alt="editer" />

                </span>

            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className='edit-comment-form'>
                    <img className='icons edit' src="./assets/icons/edit.svg" title='editer' alt="editer" onClick={() => setEdit(!edit)} />
                    <textarea className='edit-comment-text' type="text" name='text' maxLength='255' onChange={(e) => setText(e.target.value)} defaultValue={comment.body} />
                    <div className="edit-delete-icons-container">
                        <div className="comment-delete-button">
                            <img className='icons' src="./assets/icons/trash.svg" title='supprimer' alt="supprimer commentaire" onClick={() => {
                                if (window.confirm('Voulez-vous supprimer ce commentaire ?')) handleDelete()
                            }} />
                        </div>
                        <div className="comment-validate-button">
                            <img className='icons' src="./assets/icons/check.svg" title='valider' alt="valier modifications" />
                            <input type="submit" value="Valider" />
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;