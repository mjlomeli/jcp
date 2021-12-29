import {debug} from "./tools";

export const fetchCartItems = (userId) => {
    if (!userId){
        debug.error("A user id must be provided for fetchCartItem.");
    }

    return $.ajax({
        url: `/api/users/${userId}/cart_items`,
        method: 'GET'
    });
};

export const createCartItem = (cartItem, userId) => {
    if (!cartItem || Object.keys(cartItem).length === 0 || !userId){
        debug.error("A cart item object and user id must be provided for createCartItem.");
    }
    let cart_item = {...cartItem, user_id: userId};
    return $.ajax({
        url: `/api/users/${userId}/cart_items`,
        method: 'POST',
        data: {cart_item}
    });
};

export const updateCartItem = (cartItem, userId) => {
    if (!cartItem || Object.keys(cartItem).length === 0 || !userId){
        debug.error("A cart item object and user id must be provided for updateCartItem.");
    }

    let cart_item = {...cartItem, user_id: userId};
    return $.ajax({
        url: `/api/users/${userId}/cart_items/${cartItem.id}`,
        method: 'PATCH',
        data: {cart_item}
    });
};

export const deleteCartItem = (cartItemId, userId) => {
    if (!cartItemId || !userId){
        debug.error("A cart item id and user id must be provided for deleteCartItem.");
    }
    return $.ajax({
        url: `/api/users/${userId}/cart_items/${cartItemId}`,
        method: 'DELETE'
    });
};

window.CartUtil = {
    fetchCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
}