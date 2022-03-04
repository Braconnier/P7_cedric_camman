import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from '../utils/utils';
import Card from '../components/Post/Card'

const Trending = () => {
    const trendList = useSelector((state) => state.trendingReducer)
    return (
        <div className='trending-page'>
            <div className="trending-main">
                {!isEmpty(trendList[0]) && trendList.map(post => {
                    return <Card post={post} key={post.id} />
                })

                }
            </div>
        </div>
    );
};

export default Trending;