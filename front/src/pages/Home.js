import React, { useContext, } from 'react';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/Log/LogIndex';


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
            <aside>
                <div className="aside-logo-container">
                    <img className='logo-group' src="./assets/icon-above-font.png" alt="logo groupomania" />
                </div>
            </aside>
        </div>
    );


};

export default Home;