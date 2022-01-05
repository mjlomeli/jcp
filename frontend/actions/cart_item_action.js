import * as CartItemUtil from '../utils/cart_item_util'
import * as AlertAction from './alert_action'

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
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemsError(err.responseJSON))
        }
    )
)

export const createCartItem = cartItem => dispatch =>(
    CartItemUtil.createCartItem(cartItem).then(
        cartItem => {
            dispatch(AlertAction.success("Its been placed into your cart."));
            dispatch(receiveCartItem(cartItem))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(cartItem.id, err.responseJSON))
        }
    )
)

export const updateCartItem = cartItem => dispatch =>(
    CartItemUtil.updateCartItem(cartItem).then(
        cartItem => dispatch(receiveCartItem(cartItem)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(cartItem.id, err.responseJSON))
        }
    )
)

export const deleteCartItem = cartItemId => dispatch =>(
    CartItemUtil.deleteCartItem(cartItemId).then(
        cartItem => {
            dispatch(AlertAction.caution("The item has been removed from your cart."));
            dispatch(removeCartItem(cartItem.id))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(cartItemId, err.responseJSON))
        }
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