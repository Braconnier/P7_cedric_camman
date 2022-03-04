import React, { useContext, } from 'react';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/Log/LogIndex';
import Trends from '../components/Trends';


const Home = () => {
    const uid = useContext(UidContext)


    return (
        <div className="landing">
            <div className="main">
                {uid
                    ? (<NewPostForm />)
                    : (<div className="log-container">
                        <Log register={true} login={false} />
                    </div>)}
                <Thread />
            </div>
            <aside className='aside'>
                <div className="trending">
                    <Trends />
                </div>
                <div className="logo-container">
                    <img src="./assets/icon-above-font.png" alt="img-log" />
                </div>
            </aside>
        </div>
    );


};

export default Home;