import * as CartItemUtil from '../utils/cart_item_util'

export const RECEIVE_CART_ITEMS = "RECEIVE_CART_ITEMS";
export const RECEIVE_CART_ITEM = "RECEIVE_CART_ITEM";
export const RECEIVE_CART_ITEM_ERROR = "RECEIVE_CART_ITEM_ERROR";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

const receiveCartItems = cartItems =>({
    type: RECEIVE_CART_ITEMS,
    cartItems: cartItems
})

const receiveCartItem = cartItem =>({
    type: RECEIVE_CART_ITEM,
    cartItem: cartItem
})

const removeCartItem = cartItemId =>({
    type: REMOVE_CART_ITEM,
    cartItemId: cartItemId
})

const receiveCartItemError = errors =>({
    type: RECEIVE_CART_ITEM_ERROR,
    errors: errors
})



/*    Separation      */


export const fetchCartItems = (user_id) => dispatch => (
    CartItemUtil.fetchCartItems(user_id).then(
        cartItems => dispatch(receiveCartItems(cartItems)),
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
)

export const createCartItem = cartItem => dispatch =>(
    CartItemUtil.createCartItem(cartItem).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
)

export const updateCartItem = cartItem => dispatch =>(
    CartItemUtil.updateCartItem(cartItem).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
)

export const deleteCartItem = cartItemId => dispatch =>(
    CartItemUtil.deleteCartItem(cartItemId).then(
        cartItem => dispatch(removeCartItem(cartItem.id)),
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
)

window.CartItemAction = {
    fetchCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
}