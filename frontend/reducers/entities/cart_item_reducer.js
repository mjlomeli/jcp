import {
    RECEIVE_CART_ITEM,
    REMOVE_CART_ITEM,
    RECEIVE_CART_ITEMS
} from "../../actions/cart_item_action";

export default function CartItemReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_CART_ITEMS:
            action.cartItems.forEach(cartItem =>{
                newState[cartItem.id] = cartItem;
            })
            return newState;
        case RECEIVE_CART_ITEM:
            newState[action.cartItem.id] = action.cartItem;
            return newState;
        case REMOVE_CART_ITEM:
            delete newState[action.cartItemId]
            return newState;
        default:
            return newState
    }
}