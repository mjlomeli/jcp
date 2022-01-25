import {debug} from "./tools";

export const fetchCartItems = userId => {
    return $.ajax({
        url: `/api/cart_item`,
        method: 'GET',
        data: {user_id: userId}
    });
};

export const createCartItem = (cartItem) => {
    if (!cartItem || !Object.keys(cartItem).length){
        debug.error("A cart item object must be provided for createCartItem.");
    }
    return $.ajax({
        url: `/api/cart_item`,
        method: 'POST',
        data: cartItem
    });
};

export const updateCartItem = (cartItem) => {
    if (!cartItem || !Object.keys(cartItem).length){
        debug.error("A cart item object must be provided for updateCartItem.");
    }

    return $.ajax({
        url: `/api/cart_item`,
        method: 'PATCH',
        data: cartItem
    });
};

export const deleteCartItem = (userId, productId) => {
    if (!productId || !userId){
        debug.error("A product id and user id must be provided for deleteCartItem.");
    }
    return $.ajax({
        url: `/api/cart_item`,
        method: 'DELETE',
        data: {product_id: productId, user_id: userId}
    });
};

window.CartUtil = {
    fetchCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
}