export const fetchCartItems = () => {
    return $.ajax({
        url: '/api/cartItems',
        method: 'GET'
    });
};

export const fetchCartItem = (cartItemId) => {
    return $.ajax({
        url: `/api/cartItems/${cartItemId}`,
        method: 'GET'
    });
};

export const createCartItem = (cartItem) => {
    return $.ajax({
        url: '/api/cartItems',
        method: 'POST',
        data: {cartItem: cartItem}
    });
};

export const updateCartItem = (cartItem) => {
    return $.ajax({
        url: `/api/cartItems/${cartItem.id}`,
        method: 'PATCH',
        data: {cartItem: cartItem}
    });
};

export const deleteCartItem = (cartItemId) => {
    return $.ajax({
        url: `/api/cartItems/${cartItemId}`,
        method: 'DELETE'
    });
};

window.fetchCartItem = fetchCartItem;
window.fetchCartItem = fetchCartItem;
window.createCartItem = createCartItem;
window.updateCartItem = updateCartItem;
window.deleteCartItem = deleteCartItem;