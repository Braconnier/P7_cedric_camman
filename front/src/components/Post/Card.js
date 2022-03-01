import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePost } from '../../actions/post.actions';
import { dateParser, isEmpty } from '../../utils/utils';
import CardComments from './CardComments';
import DeleteCard from './DeleteCard';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState('')

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
    const postsData = useSelector((state) => state.postReducer)
    const dispatch = useDispatch()

    const updateItem = async () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setIsUpdated(!isUpdated)
    }

    const cancelEdit = () => {
        setIsUpdated(!isUpdated)
        setTextUpdate('')
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
        !isEmpty(postsData[0]) && setComments(post.Comments)
    }, [usersData, userData, postsData, post.Comments])


    return (
        <div className="card-container" >
            {isLoading
                ? (<i className='fas fa-spinner fa-spin'></i>)
                : (<div className="card-body">
                    <div className="card-header">
                        <div className="poster-container">
                            {!isEmpty(usersData[0]) && usersData.map((user) => {
                                if (user.uuid === post.userId) {
                                    return (<div key={user.uuid.toString()} className="poster-container-info">
                                        <img src={`http://localhost:5000` + user.profileImgUrl} alt={"profile de " + user.name} />
                                        <div>{user.name}</div>
                                    </div>)
                                } else {
                                    return null
                                }
                            }
                            )}
                        </div>
                        <p className="updated-at">Denière modifications le: {dateParser(post.updatedAt)}</p>
                    </div>
                    <div className="post-body">
                        {isUpdated === false &&
                            <>
                                <p className="post-body-text">{post.body}</p>
                                {post.imageUrl &&
                                    <div className="post-image-container">
                                        <img src={`http://localhost:5000` + post.imageUrl} alt='post' />
                                    </div>
                                }
                            </>
                        }
                        {isUpdated && (
                            <div className="update-post">
                                <textarea className='update-post-text'
                                    defaultValue={post.body}
                                    onChange={(e) => setTextUpdate(e.target.value)}
                                />
                                {post.imageUrl &&
                                    <div className="post-image-container">
                                        <img src={`http://localhost:5000` + post.imageUrl} alt='post' />
                                    </div>
                                }
                                <div className="edit-delete-icons-container">
                                    <img className='icons' src="./assets/icons/check.svg" alt="valider modifications" onClick={updateItem} />
                                    <img className='icons' src="./assets/icons/cancel.svg" alt="annuler modifications" onClick={cancelEdit} />
                                </div>
                            </div>)
                        }
                    </div>
                    <div className="card-footer">
                        <div className="post-comments">
                            <img className='icons' onClick={() => setShowComments(!showComments)} src="./assets/icons/comment.svg" alt="comment" />
                            {
                                < span > {comments.length}</span>
                            }
                        </div>
                        <div className="card-footer-right">
                            {userData.uuid === post.userId && (
                                <div className="edit-container">
                                    <div onClick={() => setIsUpdated(!isUpdated)}>
                                        <img className='icons' src="./assets/icons/edit.svg" alt="edit" />
                                    </div>
                                    <DeleteCard postId={post.id} />
                                </div>
                            )}
                            <div className="post-likes">
                                <LikeButton post={post} />
                            </div>
                        </div>
                    </div>
                </div>
                )
            }
            {showComments && <CardComments post={post} comments={comments} />}
        </div >
    );
};

export default Card;