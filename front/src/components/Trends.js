import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getTrends } from '../actions/post.actions';
import { isEmpty } from '../utils/utils';

const Trends = () => {

    const posts = useSelector((state) => state.allPostsReducer);
    const usersData = useSelector((state) => state.usersReducer);
    const trendList = useSelector((state) => state.trendingReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isEmpty(posts[0])) {
            const postsArray = Object.keys(posts).map((i) => posts[i])
            let sortedArray = postsArray.sort((a, b) => {
                return b.Likes.length - a.Likes.length
            })
            sortedArray.length = 3
            dispatch(getTrends(sortedArray))
        }
    }, [posts, dispatch])


    return (
        <div className="trending-container">
            <h4>Trending</h4>
            <NavLink exact to="/trending">
                {trendList.length && trendList.map(post => {
                    return (
                        <div className="trend-card">
                            <div key={post.id} className="trend-post">
                                {post.imageUrl && <div className="trend-post-img-container">
                                    <img className='post-image' src={`http://localhost:5000` + post.imageUrl} alt="post-pic" />
                                </div>
                                }
                                {isEmpty(post.imageUrl) && usersData.map(user => {
                                    if (user.uuid === post.userId) {
                                        return (<div className="trend-post-img-container">
                                            <img className='profile-image' src={`http://localhost:5000` + user.profileImgUrl} alt="user-pic" />
                                        </div>)
                                    } else {
                                        return null
                                    }
                                })

                                }
                                <div className="trend-content">
                                    {post.body}
                                </div>
                                <div className='link-to-trend'>Lire</div>
                            </div>
                        </div>
                    )
                })
                }
            </NavLink>
        </div>
    );
};

export default Trends;