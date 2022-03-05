import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/styles.scss'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import { getUsers } from './actions/users.actions';

// DevTools
import { composeWithDevTools } from 'redux-devtools-extension'

// axios config
import axios from 'axios'
axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`
const accessToken = window.localStorage.getItem('token')
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';



const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk))

)
store.dispatch(getUsers());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

