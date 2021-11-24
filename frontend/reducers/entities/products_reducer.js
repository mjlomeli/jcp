import {
    RECEIVE_PRODUCT,
    REMOVE_PRODUCT,
    RECEIVE_PRODUCT_ERROR,
    RECEIVE_PRODUCTS
} from "../../actions/product_actions";

export default function ProductReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PRODUCTS:
            return {...newState, ...action.products}
        case RECEIVE_PRODUCT:
            newState[action.product.id] = action.product
            return newState
        case REMOVE_PRODUCT:
            delete newState[action.productId]
            return newState
        case RECEIVE_PRODUCT_ERROR:
            console.debug("[ProductReducer]: Error needs to be in errors reducer. \n\t↳ frontend/reducers/products_error_reducer.js:21")
            return newState
        default:
            console.debug("[ProductReducer]: No case matched \n\t↳ frontend/reducers/products_error_reducer.js:24")
            return newState
    }
}