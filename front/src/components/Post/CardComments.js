import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, addComment } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../../utils/utils';
import { UidContext } from '../AppContext';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({ post, comments }) => {

    // const currentPage = window.location.pathname
    const uid = useContext(UidContext)
    const [text, setText] = useState('')
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    let commenterRole

    const dispatch = useDispatch()

    const handleComment = async (e) => {
        e.preventDefault()
        if (text) {
            const postId = post.id
            const userId = userData.uuid
            const body = text
            await dispatch(addComment(postId, userId, body))
            await dispatch(getPosts())
            setText('')
        }
    }

    return (
        <div className='comments-container'>
            {
                // (currentPage === `/trending`)
                // ? (null)
                // : (
                userData.uuid && (
                    <form action="" onSubmit={handleComment} className='comment-form'>
                        <textarea type="text" name='text' maxLength='255' onChange={(e) => setText(e.target.value)} value={text} placeholder='Commenter' />
                        <br />
                        <input type="submit" value='Envoyer' />
                    </form>)
                // )
            }
            {comments.map((comment) => {
                return (
                    <div key={comment.createdAt.toString()} className={
                        comment.userId === uid
                            ? 'comment-container client'
                            : 'comment-container'
                    } >
                        <div className="comment-header">
                            <div className="left-part">
                                {!isEmpty(usersData[0]) && usersData.map((user) => {
                                    if (user.uuid === comment.userId) {
                                        commenterRole = user.role
                                        return <div className='left-part-info' key={user.createdAt.toString()}>
                                            <img src={`http://localhost:5000` + user.profileImgUrl} alt={"profile de " + user.name} />
                                            <div className="comment-pseudo">
                                                <p className='title'>{user.name}</p>
                                            </div>
                                        </div>
                                    } else {
                                        return null
                                    }
                                }
                                )}
                            </div>
                            <div className="right-part">
                                <div className="commented-at">
                                    <p>Le: {dateParser(comment.createdAt)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="comment-body">
                            {comment.body}
                        </div>
                        <EditDeleteComment comment={comment} postId={post.id} commenterRole={commenterRole} />
                    </div>
                )
            })}
        </div>
    );
};

export default CardComments;