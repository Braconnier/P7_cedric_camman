import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/post.actions';
import { isEmpty } from "../utils/utils";
import Card from '../components/Post/Card';

const Thread = () => {
    const [loadPosts, setLoadPosts] = useState(true)
    const [count, setCount] = useState(5)
    const dispatch = useDispatch()
    const posts = useSelector((state) => state.postReducer)

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.documentElement.scrollHeight) {
            setLoadPosts(true)
        }
    }

    useEffect(() => {
        if (loadPosts) {
            dispatch(getPosts(count));
            setLoadPosts(false)
            setCount(count + 5)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore)
    }, [loadPosts, count, dispatch])

    return (
        <div className='thread-container'>
            <ul>
                {!isEmpty(posts[0]) &&
                    posts.map((post) => {
                        return <Card key={post.id} post={post} />
                    })}
            </ul>
        </div>
    );
};

export default Thread;