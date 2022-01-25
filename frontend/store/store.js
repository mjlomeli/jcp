import {applyMiddleware, createStore} from 'redux';
import rootReducer from './../reducers/root_reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Store} from "../lib/store";

const configureStore = (preloadedState = {}, test=false) => {
    let store = null;
    if (test)
        store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
    else
        store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
    Store.store = store;
    return store;
}

export default configureStore