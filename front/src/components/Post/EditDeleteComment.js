import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { editComment, deleteComment } from '../../actions/post.actions';
import { UidContext } from '../AppContext';

const EditDeleteComment = ({ comment, postId }) => {
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

    const handleDelete = () => dispatch(deleteComment(comment.id))

    useEffect(() => {
        const checkAuthor = () => {
            if (uid === comment.userId) setIsAuthor(true)
        }
        checkAuthor()
    }, [uid, comment.userId])
    return (
        <div className="edit-comment">
            {isAuthor && edit === false && (
                <span onClick={() => setEdit(!edit)}>
                    <img className='icons' src="./assets/icons/edit.svg" alt="edit" />
                </span>

            )}
            {isAuthor && edit && (
                <form action="" onSubmit={handleEdit} className='edit-comment-form'>
                    <label htmlFor="text" onClick={() => setEdit(!edit)}>Editer</label>
                    <br />
                    <textarea type="text" name='text' onChange={(e) => setText(e.target.value)} defaultValue={comment.body} />
                    < br />
                    <div className="comment-delete-button">
                        <span onClick={() => {
                            if (window.confirm('Voulez-vous supprimer ce commentaire ?')) handleDelete()
                        }}>
                            <img className='icons' src="./assets/icons/trash.svg" alt="edit" />
                        </span>
                        <input type="submit" value="Valider" />
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditDeleteComment;