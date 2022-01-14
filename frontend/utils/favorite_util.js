import {debug} from "./tools";

export const fetchFavorites = (userId) => {
    if (!userId){
        debug.error("A user id must be provided for fetchFavorite.");
    }

    return $.ajax({
        url: `/api/users/${userId}/favorites`,
        method: 'GET'
    });
};

export const createFavorite = (userId, productId) => {
    if (!productId || !userId){
        debug.error("A productId and user id must be provided for createFavorite.");
    }
    return $.ajax({
        url: `/api/users/${userId}/favorites`,
        method: 'POST',
        data: {user_id: userId, product_id: productId}
    });
};


export const deleteFavorite = (userId, productId) => {
    if (!productId || !userId){
        debug.error("A product id and user id must be provided for deleteFavorite.");
    }
    return $.ajax({
        url: `/api/favorite`,
        method: 'DELETE',
        data: {user_id: userId, product_id: productId}
    });
};

window.FavoriteUtil = {
    fetchFavorites,
    createFavorite,
    deleteFavorite
}