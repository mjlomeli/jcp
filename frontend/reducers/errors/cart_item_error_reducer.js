import {
    RECEIVE_CART_ITEM,
    RECEIVE_CART_ITEM_ERROR
} from "../../actions/cart_item_action";

export default (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_CART_ITEM_ERROR:
            return action.errors;
        case RECEIVE_CART_ITEM:
            return []; // If the product_template is valid, return empty errors
        default:
            return prevState;
    }
};
