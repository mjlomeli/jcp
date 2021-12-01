import {
    RECEIVE_PRODUCT,
    REMOVE_PRODUCT,
    RECEIVE_PRODUCT_ERROR,
    RECEIVE_PRODUCTS
} from "../../actions/product_actions";

export default function UIProductReducer(prevState={}, action){
    Object.freeze(prevState);
    let newState = Object.assign({}, prevState) // this isn't a deep copy
    switch(action.type){
        case RECEIVE_PRODUCTS: // store the new state and store the id's of all the fetched, overriding any previous id's saved.
            newState.productsList = [];
            action.products.forEach(product =>{
                newState.products[product.id] = product;
            })
            return newState;
        case RECEIVE_PRODUCT:
            newState.products[action.product.id] = action.product
            return newState
        case REMOVE_PRODUCT:
            delete newState.products[action.productId]
            if (newState.productsList.includes(action.productId))
                newState.productsList.splice(newState.productsList.indexOf(action.productId), 1);
            return newState
        case RECEIVE_PRODUCT_ERROR:
            console.debug("[ProductReducer]: Error needs to be in errors reducer. \n\t↳ frontend/reducers/products_error_reducer.js:21")
            return newState
        default:
            console.debug("[ProductReducer]: No case matched \n\t↳ frontend/reducers/products_error_reducer.js:24")
            return newState
    }
}