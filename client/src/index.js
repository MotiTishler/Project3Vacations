import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { userReducer, vacationsReducer } from './reducers'
import { Provider } from 'react-redux';

import thunk from 'redux-thunk'

// create redux store 
const mystore = createStore(combineReducers({
  user:userReducer,
  vList:vacationsReducer
}),
applyMiddleware(thunk))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={mystore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
