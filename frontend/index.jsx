import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from "./store/store";
import Root from "./components/root";
import {debug, isNodeJs, isBrowser} from "./utils/tools";
import {fetchProductsTitles, fetchProducts} from "./actions/product_action";

document.addEventListener("click", (e) => {
    let el = e.target;
    do {
        if (el){}
        el = el.parentNode;
    } while (el)
})

document.addEventListener("DOMContentLoaded", () => {
    let store;
    if (window.currentUser) {
        const preloadedState = {
            session: {id: window.currentUser.user.id},
            entities: {
                cartItems: window.currentUser.cartItems,
                user: window.currentUser.user,
                favorites: new Set(window.currentUser.favorites)
            }
        }
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else {
        store = configureStore({})
    }
    fetchProductsTitles()(store.dispatch)
    const root = document.getElementById("root");
    window.store = store;
    ReactDOM.render(<Root store={store}/>, root);

    window.debug = debug;
    window.isNodeJs = isNodeJs
    window.isBrowser = isBrowser
});