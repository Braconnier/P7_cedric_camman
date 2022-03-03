import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { UidContext } from '../components/AppContext'
import { isEmpty } from '../utils/utils';
import Card from '../components/Post/Card'

const Trending = () => {
    const uid = useContext(UidContext)
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