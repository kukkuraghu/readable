import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; //used for actions that return function
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import reducer from './reducers';
import { fetchCategories, fetchPosts } from './actions';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

//get all the categories to the store
store.dispatch(fetchCategories());

//get all the posts and the comments to the store
store.dispatch(fetchPosts());

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();