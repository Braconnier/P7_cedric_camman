import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dateParser, isEmpty } from '../../utils/utils';
import LikeButton from './LikeButton';

const Card = ({ post }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [isUpdated, setIsUpdated] = useState(false)
    const [textUpdate, setTextUpdate] = useState(null)

    const usersData = useSelector((state) => state.usersReducer)
    const userData = useSelector((state) => state.userReducer)

    const dispatch = useDispatch()

    const updatePost = () => {
        if (textUpdate) {
            dispatch(updatePost(post.id, textUpdate))
        }
        setIsUpdated(false)
    }

    useEffect(() => {
        !isEmpty(usersData[0]) && setIsLoading(false)
    }, [usersData, userData])

    return (
        <li className="card-container" key={post.id}>
            {isLoading
                ? (<i className='fas fa-spinner fa-spin'></i>)
                : (<>
                    {!isEmpty(usersData[0]) && usersData.map((user) => {
                        if (user.uuid === post.userId) {
                            return (
                                <div key={post.id} className="card-body">
                                    <div className="card-header">
                                        <div className="poster-img">
                                            <div className="poster-profile-image-container">
                                                <img src={"http://localhost:5000" + user.profileImgUrl} alt={"profile de " + user.name} />
                                            </div>
                                        </div>
                                        <p className="updated-at">{dateParser(post.updatedAt)}</p>
                                    </div>
                                    <div className="card-body">
                                        {isUpdated === false && <p className="post-body">{post.body}</p>}
                                        {isUpdated === true && (
                                            <div className="update-post">
                                                <textarea
                                                    defaultValue={post.body}
                                                    onChange={(e) => setTextUpdate(e.target.value)}
                                                />
                                                <div className="button-container" onClick={updatePost}>Valider modifications</div>
                                            </div>)
                                        }
                                        {userData.uuid === post.userUuid && (
                                            <div className="button-container">
                                                <div onClick={() => setIsUpdated(!isUpdated)}>
                                                    <img src="./assets/icons/edit.svg" alt="edit" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="card-footer">
                                        <div className="post-comments">
                                            <h5>Comment button</h5>
                                        </div>
                                        <div className="post-likes">
                                            <LikeButton post={post} />
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            return null
                        }
                    })
                    }
                </>)
            }
        </li>
    );
};

export default Card;