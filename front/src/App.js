import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getUser } from './actions/user.actions';
import { UidContext } from './components/AppContext';
import Routes from './components/routes'



const App = () => {

  const [uid, setUid] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUid(window.localStorage.getItem('user'))
    if (uid) dispatch(getUser(uid))
  }, [uid, dispatch])

  return (
    <React.StrictMode>
      <UidContext.Provider value={uid}>
        <div className="app">
          <Routes />
        </div>
      </UidContext.Provider>
    </React.StrictMode>
  );
};

export default App;
