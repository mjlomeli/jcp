import {applyMiddleware, createStore} from 'redux';
import rootReducer from './../reducers/root_reducer';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import {Store} from "../lib/store";

const configureStore = (preloadedState = {}) => {
    let store = createStore(rootReducer, preloadedState, applyMiddleware(thunk, logger));
    Store.store = store;
    return store;
}

export default configureStore