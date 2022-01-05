import {
    RECEIVE_PRODUCT,
    RECEIVE_PRODUCTS,
    RECEIVE_PRODUCTS_ERROR,
    RECEIVE_PRODUCT_ERROR,
    RESET_PRODUCT_ERROR,
    RESET_PRODUCTS_ERROR
} from "../../actions/product_action";

export const errorProduct =  (prevState = {}, action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_PRODUCT_ERROR:
            newState[action.productId] = action.errors;
            return newState;
        case RECEIVE_PRODUCT:
            delete newState[action.product.id];
            return newState;
        case RESET_PRODUCT_ERROR:
            delete newState[action.productId];
            return newState;
        default:
            return prevState;
    }
};


export const errorProducts =  (prevState = [], action) => {
    Object.freeze(prevState);
    switch (action.type) {
        case RECEIVE_PRODUCTS_ERROR:
            return action.errors;
        case RECEIVE_PRODUCTS:
        case RESET_PRODUCTS_ERROR:
            return []; // if product is valid, then errors are empty
        default:
            return prevState;
    }
};
