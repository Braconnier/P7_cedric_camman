import axios from 'axios';
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
    const [comments, setComments] = useState(false)

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)
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

    }, [usersData, userData, dispatch])

    const getComments = (postId) => {

        axios.get(`/comments/post/${postId}`)
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }


    return (
        <li key={post.createdAt} className="card-container" >
            {isLoading
                ? (<i className='fas fa-spinner fa-spin'></i>)
                : (<>
                    <div className="card-body">
                        <div className="card-header">
                            <div className="poster-img">
                                <div className="poster-img-container">
                                    {!isEmpty(usersData[0]) && usersData.map((user) => {
                                        if (user.uuid === post.userId) {
                                            return <>
                                                <img key={user.uuid} src={`http://localhost:5000` + user.profileImgUrl} alt={"profile de " + user.name} />
                                                <div>{user.name}</div>
                                            </>

                                        } else {
                                            return null
                                        }
                                    }
                                    )}
                                </div>
                            </div>
                            <p className="updated-at">Posté le: {dateParser(post.updatedAt)}</p>
                        </div>
                        <div className="post-body">
                            {isUpdated === false &&
                                <>
                                    <p className="post-body-text">{post.body}</p>
                                    {post.imageUrl &&
                                        <>
                                            <div className="post-image-container">
                                                <img src={`http://localhost:5000` + post.imageUrl} alt='post' />
                                            </div>
                                        </>
                                    }
                                </>
                            }
                            {isUpdated && (
                                <div className="update-post">
                                    <textarea
                                        defaultValue={post.body}
                                        onChange={(e) => setTextUpdate(e.target.value)}
                                    />
                                    {post.imageUrl &&
                                        <>
                                            <div className="post-image-container">
                                                <img src={`http://localhost:5000` + post.imageUrl} alt='post' />
                                            </div>
                                        </>
                                    }

                                    <div className="validate-edit-button" onClick={updateItem}>Valider modifications</div>
                                    <div className="cancel-edit" onClick={cancelEdit}>Annuler les modifications</div>
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
                        {showComments && <CardComments key={post.id} post={post} />}
                    </div>


                </>
                )
            }
        </li >
    );
};

export default Card;