import * as ProductAction from "../actions/product_action";
import * as CartItemAction from "../actions/cart_item_action";
import * as FavoriteAction from "../actions/favorite_action";

export const initialBoot = () => (dispatch) => {
    // runs the initial fetches to initializes the data
    // every time a user clicks on the browser's refresh
    return dispatch(fetchNavBarItems())
        .then(_=> dispatch(fetchIndexer()))
        .then(_=> dispatch(fetchCartItems()))
        .then(_=> dispatch(fetchFavorites()))
}

const fetchIndexer = () => (dispatch, getState) => {
    let resolve = Promise.resolve();
    if (!getState) return resolve;
    let index = getState().index;
    if (!index || !index.titles) return resolve;

    let titles = index.titles;
    if (titles.data && !Object.entries(titles.data).length)
        return dispatch(ProductAction.fetchProductsTitles());
    else
        return resolve;
}

const fetchCartItems = () => (dispatch, getState) => {
    let resolve = Promise.resolve();
    if (!getState) return resolve;
    let entities = getState().entities;
    if (!entities || !entities.cartItems) return resolve;

    let userId = entities.userId;
    if (!userId) return resolve;

    let cartItems = entities.cartItems;
    if (!Object.entries(cartItems.data).length)
        return dispatch(CartItemAction.fetchCartItems(userId));
    else
        return resolve;
}

const fetchFavorites = () => (dispatch, getState) => {
    let resolve = Promise.resolve();
    if (!getState) return resolve;

    let state = getState();
    let entities = state.entities;

    if (!entities || !entities.favorites) return resolve;
    let favoriteIds = entities.favorites;

    let userId = state.session.id;
    if (!userId) return resolve;

    if (!favoriteIds.length)
        return dispatch(FavoriteAction.fetchFavorites(userId));
    else
        return resolve;
}

const fetchNavBarItem = path => (dispatch, getState) => {
    let index = getState().index;
    if (!(JSON.stringify(path) in index.query))
        return dispatch(ProductAction.fetchProducts(path));
    else
        return Promise.resolve();
}

const fetchNavBarItems = () => (dispatch, getState) => {
    let paths = [
        {taxonomy_paths: ["Art & Collectibles"]},
        {taxonomy_paths: ["Craft Supplies & Tools"]},
        {taxonomy_paths: ["Books, Movies & Music"]},
        {taxonomy_paths: ["Home & Living"]},
        {taxonomy_paths: ["Home Decor"]},
        {taxonomy_paths: ["Jewelry"]},
        {taxonomy_paths: ["Toys & Games"]},
        {taxonomy_paths: ["Kitchen & Dining"]},
        {taxonomy_paths: ["Drink & Barware"]}
    ];
    for (let i = 0, p = Promise.resolve(); i < paths.length; i++) {
        p = p.then(_ => dispatch(fetchNavBarItem(paths[i])));
    }
    return Promise.resolve();
}

window.PostFetching = {
    fetchNavBarItems,
    fetchIndexer
}