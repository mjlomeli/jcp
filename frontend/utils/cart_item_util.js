import {debug} from "./tools";

export const fetchCartItems = () => {
    return $.ajax({
        url: `/api/cart_item`,
        method: 'GET'
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

export const deleteCartItem = (productId) => {
    if (!productId){
        debug.error("A product id must be provided for deleteCartItem.");
    }
    return $.ajax({
        url: `/api/cart_item`,
        method: 'DELETE',
        data: {product_id: productId}
    });
};

window.CartUtil = {
    fetchCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
}