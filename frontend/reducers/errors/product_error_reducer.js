import {
    RECEIVE_PRODUCTS,
    RECEIVE_PRODUCTS_ERRORS,
    RESET_PRODUCTS_ERRORS,
    RESET_ALL_PRODUCTS_ERRORS,
    RECEIVE_PRODUCTS_GENERAL_ERRORS,
} from "../../actions/product_action";

export const productsError =  (prevState = {}, action) => {
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState);
    switch (action.type) {
        case RECEIVE_PRODUCTS_ERRORS:
            Object.entries(action.errors).forEach(pair =>{
                let [productId, errors] = pair;
                newState[productId] = errors;
            })
            return newState;
        case RESET_PRODUCTS_ERRORS:
            action.productIds.forEach(productId => delete newState[productId])
            return newState;
        case RESET_ALL_PRODUCTS_ERRORS:
            return {};
        case RECEIVE_PRODUCTS:
            Object.entries(action.listings.products).forEach(pair =>{
                let [productId, product] = pair;
                delete newState[productId];
            })
            return newState;
        default:
            return prevState;
    }
};


export const productsGeneralErrors =  (prevState = [], action) => {
    Object.freeze(prevState);
    let newState = [...prevState];
    switch (action.type) {
        case RECEIVE_PRODUCTS_ERRORS:
            Object.entries(action.errors).forEach(pair =>{
                let [productId, errors] = pair;
                newState.push(`[${productId}]: ${errors.join(", ")}`);
            })
            return newState;
        case RECEIVE_PRODUCTS_GENERAL_ERRORS:
            return [...newState, ...action.errors];
        case RESET_PRODUCTS_ERRORS:
            return [];
        default:
            return prevState;
    }
};