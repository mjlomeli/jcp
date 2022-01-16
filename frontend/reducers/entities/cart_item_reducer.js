import {
    CLEAR_ALL_CART_ITEMS,
    REMOVE_CART_ITEM,
    RECEIVE_CART_ITEMS
} from "../../actions/cart_item_action";

export default function CartItemReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_CART_ITEMS:
            newState = {...prevState, ...action.cartItems}
            return newState;
        case REMOVE_CART_ITEM:
            delete newState[parseInt(action.productId)]
            return newState;
        case CLEAR_ALL_CART_ITEMS:
            return {};
        default:
            return prevState
    }
}