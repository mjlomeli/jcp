export const fetchCartItems = (userId) => {
    return $.ajax({
        url: `/api/users/${userId}/cart_items`,
        method: 'GET'
    });
};

export const createCartItem = (cartItem, userId) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    let cart_item = {...cartItem, user_id: userId};
    return $.ajax({
        url: `/api/users/${userId}/cart_items`,
        method: 'POST',
        data: {cart_item}
    });
};

export const updateCartItem = (cartItem, userId) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    let cart_item = {...cartItem, user_id: userId};
    return $.ajax({
        url: `/api/users/${userId}/cart_items/${cartItem.id}`,
        method: 'PATCH',
        data: {cart_item}
    });
};

export const deleteCartItem = (cartItemId, userId) => {
    // Column user_id doesnt exist must use find_by(id: params[:user_id])
    return $.ajax({
        url: `/api/users/${userId}/cart_items/${cartItemId}`,
        method: 'DELETE'
    });
};

window.fetchCartItems = fetchCartItems;
window.createCartItem = createCartItem;
window.updateCartItem = updateCartItem;
window.deleteCartItem = deleteCartItem;