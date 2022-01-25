import * as CartItemUtil from '../utils/cart_item_util'
import * as AlertAction from './alert_action'
import {parse_int_cart_item_ids} from "../utils/tools";

export const RECEIVE_CART_ITEMS = "RECEIVE_CART_ITEMS";
export const RECEIVE_CART_ITEM = "RECEIVE_CART_ITEM";
export const CLEAR_ALL_CART_ITEMS = "CLEAR_ALL_CART_ITEMS";
export const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

export const RECEIVE_CART_ITEM_ERROR = "RECEIVE_CART_ITEM_ERROR";
export const RECEIVE_CART_ITEMS_ERROR = "RECEIVE_CART_ITEMS_ERROR";
export const RESET_CART_ITEM_ERROR = "RESET_CART_ITEM_ERROR";
export const RESET_CART_ITEMS_ERROR = "RESET_CART_ITEMS_ERROR";


const receiveCartItems = cartItems =>({
    type: RECEIVE_CART_ITEMS,
    cartItems: parse_int_cart_item_ids(cartItems)
})

const removeCartItem = productId =>({
    type: REMOVE_CART_ITEM,
    productId: productId
})

const receiveCartItemError = (productId, errors) =>({
    type: RECEIVE_CART_ITEM_ERROR,
    productId: productId,
    errors: errors
})

export const receiveCartItemsError = errors =>({
    type: RECEIVE_CART_ITEMS_ERROR,
    errors: errors
})


/*    Separation      */


export const fetchCartItems = () => dispatch => (
    CartItemUtil.fetchCartItems().then(
        cartItems => dispatch(receiveCartItems(cartItems)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemsError(err.responseJSON))
        }
    )
)

export const createCartItem = cartItem => dispatch =>(
    CartItemUtil.createCartItem(cartItem).then(
        cartItems => {
            dispatch(AlertAction.success("Its been placed into your cart."));
            dispatch(receiveCartItems(cartItems));
        },
        err => {
            console.log(err);
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(cartItem.product_id, err.responseJSON))
        }
    )
)

export const updateCartItem = cartItem => dispatch =>(
    CartItemUtil.updateCartItem(cartItem).then(
        cartItems => dispatch(receiveCartItems(cartItems)),
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(cartItem.id, err.responseJSON))
        }
    )
)

export const deleteCartItem = productId => (dispatch, getState) =>(
    CartItemUtil.deleteCartItem(getState().session.id, productId).then(
        cartItems => {
            dispatch(AlertAction.caution("The item has been removed from your cart."));
            dispatch(removeCartItem(productId))
        },
        err => {
            dispatch(AlertAction.systemError(err.responseJSON));
            return dispatch(receiveCartItemError(productId, err.responseJSON))
        }
    )
)

export const deleteAllCartItems = () => (dispatch, getState) => {
    let productIds = Object.keys(getState().entities.cartItems);
    let userId = getState().session.id;
    productIds.forEach(productId => {
        CartItemUtil.deleteCartItem(userId, productId).then(
            cartItems => dispatch(removeCartItem(productId)),
            err => dispatch(receiveCartItemError(productId, err.responseJSON))
        )
    })
    let currentIds = Object.keys(getState().entities.cartItems);
    if (productIds.every(id => !currentIds.includes(id)))
        return dispatch(AlertAction.caution("All item have been removed from your cart."));
    else
        return dispatch(AlertAction.systemError(["Errors occurred when removing all items from your cart."]));
}

export const silentDeleteAllCartItems = () => (dispatch, getState) => {
    let productIds = Object.keys(getState().entities.cartItems);
    let userId = getState().session.id;
    let errors = [];
    productIds.forEach(productId => {
        CartItemUtil.deleteCartItem(userId, productId).then(
            cartItems => dispatch(removeCartItem(productId)),
            err => errors.concat(err)
        )
    })
    if (errors.length)
        return dispatch(receiveCartItemsError(errors))
    return Promise.resolve();
}

export const clearAllCartItems = () => dispatch =>(
    dispatch({type: CLEAR_ALL_CART_ITEMS})
);

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
    deleteCartItem,
    clearAllCartItems,
    deleteAllCartItems,
    silentDeleteAllCartItems
}