import {debug} from "../../utils/tools";
import {
    RECEIVE_CART_ITEM,
    RECEIVE_CART_ITEM_ERROR,
    RESET_CART_ITEM_ERROR,
    RESET_CART_ITEMS_ERROR
} from "../../actions/cart_item_action";

export const errorCartItem = (prevState = [], action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_CART_ITEM_ERROR:
            newState[action.cartItemId] = action.errors;
            return newState;
        case RECEIVE_CART_ITEM:
            delete newState[action.cartItem.id];
            return newState;
        case RESET_CART_ITEM_ERROR:
            delete newState[action.cartItemId];
            return newState;
        default:
            return prevState;
    }
};


export const errorCartItems = (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_CART_ITEM_ERROR:
            return action.errors;
        case RECEIVE_CART_ITEM:
        case RESET_CART_ITEMS_ERROR:
            return []; // If the cart item is valid, return empty errors
        default:
            return prevState;
    }
};
