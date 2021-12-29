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

const receiveCartItemError = cartItemError =>({
    type: RECEIVE_CART_ITEM_ERROR,
    cartItemError: cartItemError
})

const removeCartItem = cartItemId =>({
    type: REMOVE_CART_ITEM,
    cartItemId: cartItemId
})



/*    Separation      */


export const fetchCartItems = () => dispatch =>(
    CartItemUtil.fetchCartItems().then(
        cartItems => {
            return dispatch(receiveCartItems(cartItems))
        },
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
)

export const fetchCartItem = cartItemId => (dispatch) => {
    return CartItemUtil.fetchCartItem(cartItemId).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => dispatch(receiveCartItemError(err.responseJSON))
    )
}

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
    fetchCartItem,
    fetchCartItems,
    createCartItem,
    updateCartItem,
    deleteCartItem
}