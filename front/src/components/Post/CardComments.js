import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addComment } from '../../actions/comments.actions';
import { getPosts } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../../utils/utils';
import EditDeleteComment from './EditDeleteComment';

const CardComments = ({ post }) => {
    const [text, setText] = useState('')
    const [comments, setComments] = useState('')
    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const commentsData = useSelector((state) => state.commentsReducer)

    const dispatch = useDispatch()

    const handleComment = (e) => {
        e.preventDefault()
        if (text) {
            const postId = post.id
            const userId = userData.uuid
            const body = text
            dispatch(addComment(postId, userId, body))
                .then(() => dispatch(getPosts()))
                .then(() => setText(''))
        }
    }
    let commentsByPost = commentsData.filter(comments => commentsData.postID === post.id)
    console.log('====================================');
    console.log();
    console.log('====================================');
    return (
        <div className='comments-container'>
            {userData.uuid && (
                <form action="" onSubmit={handleComment} className='comment-form'>
                    <input type="text" name='text' onChange={(e) => setText(e.target.value)} value={text} placeholder='Commenter' />
                    <br />
                    <input type="submit" value='Envoyer' />
                </form>
            )}
            {comments.map((comment) => {
                return (
                    <div key={comment.id} className={
                        comment.userId === userData.uuid
                            ? 'comment-container client'
                            : 'comment-container'
                    } >
                        <div className="left-part">
                            {!isEmpty(usersData[0]) && usersData.map((user) => {
                                if (user.uuid === comment.userId) {
                                    return <img key={comment.id} src={`http://localhost:5000` + user.profileImgUrl} alt={"profile de " + user.name} />
                                } else {
                                    return null
                                }
                            }
                            )}
                        </div>
                        <div className="comment-header">
                            <div className="comment-pseudo">
                                <h3>{userData.name}</h3>
                            </div>
                            <div className="commented-at">
                                <h5>{dateParser(comment.createdAt)}</h5>
                            </div>
                        </div>
                        <div className="comment-body">
                            {comment.body}
                            <EditDeleteComment comment={comment} />
                        </div>
                    </div>
                )
            })}
        </div>
    );
};

export default CardComments;