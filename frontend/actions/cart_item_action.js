import * as CartItemUtil from '../utils/cart_item_util'

export const RECEIVE_CART_ITEMS = "RECEIVE_CART_ITEMS";
export const RECEIVE_CART_ITEM = "RECEIVE_CART_ITEM";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const RECEIVE_CART_ITEM_ERROR = "RECEIVE_CART_ITEM_ERROR";
export const RECEIVE_CART_ITEMS_ERROR = "RECEIVE_CART_ITEMS_ERROR";
export const RESET_CART_ITEM_ERROR = "RESET_CART_ITEM_ERROR";
export const RESET_CART_ITEMS_ERROR = "RESET_CART_ITEMS_ERROR";


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

const receiveCartItemError = (cartItemId, errors) =>({
    type: RECEIVE_CART_ITEM_ERROR,
    cartItemId: cartItemId,
    errors: errors
})

export const receiveCartItemsError = errors =>({
    type: RECEIVE_CART_ITEMS_ERROR,
    errors: errors
})


/*    Separation      */


export const fetchCartItems = (user_id) => dispatch => (
    CartItemUtil.fetchCartItems(user_id).then(
        cartItems => dispatch(receiveCartItems(cartItems)),
        err => dispatch(receiveCartItemsError(err.responseJSON))
    )
)

export const createCartItem = cartItem => dispatch =>(
    CartItemUtil.createCartItem(cartItem).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => dispatch(receiveCartItemError(cartItem.id, err.responseJSON))
    )
)

export const updateCartItem = cartItem => dispatch =>(
    CartItemUtil.updateCartItem(cartItem).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => dispatch(receiveCartItemError(cartItem.id, err.responseJSON))
    )
)

export const deleteCartItem = cartItemId => dispatch =>(
    CartItemUtil.deleteCartItem(cartItemId).then(
        cartItem => dispatch(removeCartItem(cartItem.id)),
        err => dispatch(receiveCartItemError(cartItemId, err.responseJSON))
    )
)

export const resetCartItemError = cartItemId => dispatch =>(
    dispatch({type: RESET_CART_ITEM_ERROR, cartItemId: cartItemId})
)

export const resetCartItemsError = () => dispatch =>(
    dispatch({type: RESET_CART_ITEMS_ERROR})
)


window.CartItemAction = {
    fetchCartItems,
    resetCartItemsError,
    resetCartItemError,
    createCartItem,
    updateCartItem,
    deleteCartItem
}