import { compose, createStore, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory';
import {loadState,saveState} from './localStorage';
import throttle from 'lodash/throttle'

// import logger from 'redux-logger'
import ReduxThunk from 'redux-thunk'

import rootReducer from './reducers'

const middlewares = [
    // process.env.NODE_ENV === 'development'  ? logger : f => f,
    ReduxThunk,
];
  
const enhancers = compose(
    applyMiddleware(...middlewares),
    window.devToolsExtension && process.env.NODE_ENV === 'development' ? window.devToolsExtension() : f => f
);

const persistedState = loadState();


const store = createStore(
    rootReducer,
    persistedState,
    enhancers
);

store.subscribe(throttle(()=>{
    saveState(store.getState())
}),1000)

const history = createHistory()

export {history,store}

if (
    process.env.NODE_ENV === 'production' &&
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__ &&
    Object.keys(window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers).length
  ) {
    window.__REACT_DEVTOOLS_GLOBAL_HOOK__._renderers = {};
}

if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextReducer = require('./reducers/index');
      store.replaceReducer(nextReducer);
    });
  }