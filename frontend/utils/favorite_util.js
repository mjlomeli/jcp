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

export const createFavorite = (productId, userId) => {
    if (!productId || !userId){
        debug.error("A productId and user id must be provided for createFavorite.");
    }
    return $.ajax({
        url: `/api/users/${userId}/favorites`,
        method: 'POST',
        data: {product_id: productId}
    });
};


export const deleteFavorite = (productId, userId) => {
    if (!productId || !userId){
        debug.error("A product id and user id must be provided for deleteFavorite.");
    }
    return $.ajax({
        url: `/api/users/${userId}/favorites/${productId}`,
        method: 'DELETE'
    });
};

window.CartUtil = {
    fetchFavorites,
    createFavorite,
    updateFavorite,
    deleteFavorite
}