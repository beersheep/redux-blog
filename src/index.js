import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// BrowserRouter interact with history library
// Route provides configuration for url
import { BrowserRouter, Route } from 'react-router-dom'
import PostsIndex from './components/posts_index'
// import { createStore } from 'react-redix'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import Reducer from './reducers/'
import promise from 'redux-promise'

const store = createStore(Reducer, applyMiddleware(promise))

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Route path="/" component={PostsIndex} />
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));

registerServiceWorker();

window.store = store
