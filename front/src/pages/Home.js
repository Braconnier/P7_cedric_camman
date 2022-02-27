import React, { useContext, } from 'react';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import Log from '../components/Log/LogIndex';


const Home = () => {
    const uid = useContext(UidContext)


    return (
        <div className="home">
            <div className="main">
                {uid
                    ? (<NewPostForm />)
                    : (<div className="log-container">
                        <Log register={true} login={false} />
                    </div>)}
                <Thread />
                <aside className='trending'></aside>
            </div>
        </div>
    );


};

export default Home;