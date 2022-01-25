import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store";
import Root from "./components/root";
import {debug, isNodeJs, isBrowser} from "./utils/tools";
import {initialBoot} from "./lib/post_fetching";

document.addEventListener("DOMContentLoaded", () => {
    let store;
    let testing = true;
    if (window.currentUser) {
        const preloadedState = {
            session: {id: window.currentUser.user.id},
            entities: {
                user: window.currentUser.user
            }
        }
        store = configureStore(preloadedState, testing);
        delete window.currentUser;
    } else {
        store = configureStore({}, testing)
    }
    initialBoot()(store.dispatch, store.getState);
    const root = document.getElementById("root");
    window.store = store;
    ReactDOM.render(<Root store={store}/>, root);

    window.debug = debug;
    window.isNodeJs = isNodeJs
    window.isBrowser = isBrowser
});